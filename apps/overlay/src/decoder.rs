use image::codecs::gif::GifDecoder;
use image::codecs::png::PngDecoder;
use image::codecs::webp::WebPDecoder;
use image::{guess_format, load_from_memory_with_format, AnimationDecoder, Frame, ImageFormat};
use std::io::Cursor;
use worker::*;

/// Collects frames from image bytes.
///
/// This function automatically detects the image format and decodes it appropriately.
/// For animated images (GIF, APNG, animated WebP), it returns all frames.
/// For static images, it returns a single frame.
///
/// # Arguments
///
/// * `bytes` - Raw image data as a byte slice
///
/// # Returns
///
/// A vector of frames on success, or an error if decoding fails.
///
/// # Errors
///
/// Returns an error if:
/// - The image format cannot be detected
/// - The image data is corrupted or invalid
/// - Frame collection fails
pub fn collect_frames(bytes: &[u8]) -> Result<Vec<Frame>> {
    let format =
        guess_format(bytes).map_err(|_| Error::RustError("Failed to guess image format".into()))?;

    match format {
        ImageFormat::Gif => GifDecoder::new(Cursor::new(bytes))
            .map_err(|_| Error::RustError("Failed to decode GIF".into()))?
            .into_frames()
            .collect_frames()
            .map_err(|_| Error::RustError("Failed to collect GIF frames".into())),
        ImageFormat::Png => {
            let decoder = PngDecoder::new(Cursor::new(bytes))
                .map_err(|_| Error::RustError("Failed to decode PNG".into()))?;
            if decoder
                .is_apng()
                .map_err(|_| Error::RustError("Failed to check APNG".into()))?
            {
                decoder
                    .apng()
                    .map_err(|_| Error::RustError("Failed to decode APNG".into()))?
                    .into_frames()
                    .collect_frames()
                    .map_err(|_| Error::RustError("Failed to collect APNG frames".into()))
            } else {
                let img = load_from_memory_with_format(bytes, format)
                    .map_err(|_| Error::RustError("Failed to decode image".into()))?
                    .to_rgba8();
                Ok(vec![Frame::new(img)])
            }
        }
        ImageFormat::WebP => {
            let decoder = WebPDecoder::new(Cursor::new(bytes))
                .map_err(|_| Error::RustError("Failed to decode WebP".into()))?;

            if decoder.has_animation() {
                return decoder
                    .into_frames()
                    .collect_frames()
                    .map_err(|_| Error::RustError("Failed to collect WebP frames".into()));
            }

            let img = load_from_memory_with_format(bytes, format)
                .map_err(|_| Error::RustError("Failed to decode image".into()))?
                .to_rgba8();
            Ok(vec![Frame::new(img)])
        }
        _ => {
            let img = load_from_memory_with_format(bytes, format)
                .map_err(|_| Error::RustError("Failed to decode image".into()))?
                .to_rgba8();
            Ok(vec![Frame::new(img)])
        }
    }
}
