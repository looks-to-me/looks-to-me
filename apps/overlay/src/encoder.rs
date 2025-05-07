use image::codecs::gif::{GifEncoder, Repeat};
use image::codecs::webp::WebPEncoder;
use image::{ExtendedColorType, Frame, RgbaImage};
use std::io::Cursor;
use worker::*;

/// Encodes a vector of frames into an animated GIF.
///
/// This function blends alpha channels with a white background since GIF doesn't
/// support true transparency with variable alpha values.
///
/// # Arguments
///
/// * `frames` - Vector of image frames to encode
///
/// # Returns
///
/// A byte vector containing the encoded GIF data.
///
/// # Errors
///
/// Returns an error if encoding fails.
pub fn encode_gif(frames: Vec<Frame>) -> Result<Vec<u8>> {
    let mut buffer = Vec::new();
    {
        let mut cursor = Cursor::new(&mut buffer);
        let mut encoder = GifEncoder::new_with_speed(&mut cursor, 10);

        // Remove alpha channel by blending with white background
        let blended_frames: Vec<Frame> = frames
            .into_iter()
            .map(|frame| {
                let buffer = frame.buffer();
                let rgba_data = buffer.as_raw();
                let (width, height) = (buffer.width(), buffer.height());

                // Blend with white background
                let mut blended_data = Vec::with_capacity(rgba_data.len());
                for chunk in rgba_data.chunks(4) {
                    let alpha = chunk[3] as f32 / 255.0;
                    let r = ((chunk[0] as f32 * alpha) + (255.0 * (1.0 - alpha))) as u8;
                    let g = ((chunk[1] as f32 * alpha) + (255.0 * (1.0 - alpha))) as u8;
                    let b = ((chunk[2] as f32 * alpha) + (255.0 * (1.0 - alpha))) as u8;

                    blended_data.push(r);
                    blended_data.push(g);
                    blended_data.push(b);
                    blended_data.push(255); // Set alpha to opaque
                }

                let blended_buffer = RgbaImage::from_raw(width, height, blended_data)
                    .expect("Failed to create image buffer");
                Frame::from_parts(blended_buffer, 0, 0, frame.delay())
            })
            .collect();

        encoder
            .set_repeat(Repeat::Infinite)
            .and_then(|_| encoder.encode_frames(blended_frames))
            .map_err(|_| Error::RustError("Failed to encode image".into()))?;
    }

    Ok(buffer)
}

/// Encodes a single frame into a lossless WebP image.
///
/// # Arguments
///
/// * `frame` - The image frame to encode
///
/// # Returns
///
/// A byte vector containing the encoded WebP data.
///
/// # Errors
///
/// Returns an error if encoding fails.
pub fn encode_webp(frame: &Frame) -> Result<Vec<u8>> {
    let mut buffer = Vec::new();
    {
        let mut cursor = Cursor::new(&mut buffer);
        let encoder = WebPEncoder::new_lossless(&mut cursor);

        let buffer = frame.buffer();
        encoder
            .encode(
                buffer,
                buffer.width(),
                buffer.height(),
                ExtendedColorType::Rgba8,
            )
            .map_err(|_| Error::RustError("Failed to encode image".into()))?;
    }

    Ok(buffer)
}
