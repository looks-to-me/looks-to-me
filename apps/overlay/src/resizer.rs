use image::imageops::resize;
use image::{imageops::FilterType, Frame};
use std::panic::{catch_unwind, AssertUnwindSafe};

/// Maximum allowed dimension (width or height) in pixels.
const MAX_DIMENSION: u32 = 1280;

/// Minimum allowed dimension (width or height) in pixels.
const MIN_DIMENSION: u32 = 320;

/// Resizes all frames to fit within the allowed dimension range.
///
/// Images are scaled to ensure both width and height are between
/// MIN_DIMENSION and MAX_DIMENSION while maintaining aspect ratio.
///
/// # Arguments
///
/// * `frames` - Mutable vector of frames to resize
///
/// # Errors
///
/// Returns an error if resizing fails or panics.
pub fn resize_frames(frames: &mut Vec<Frame>) -> worker::Result<()> {
    let result = catch_unwind(AssertUnwindSafe(|| {
        if frames.is_empty() {
            return;
        }

        let first_frame = &frames[0];
        let (width, height) = (first_frame.buffer().width(), first_frame.buffer().height());

        let needs_resize = width > MAX_DIMENSION
            || height > MAX_DIMENSION
            || width < MIN_DIMENSION
            || height < MIN_DIMENSION;

        if !needs_resize {
            return;
        }

        // Resize all frames using high-quality Lanczos3 filter
        let (new_width, new_height) = calculate_new_dimensions(width, height);
        for frame in frames.iter_mut() {
            let resized = resize(frame.buffer(), new_width, new_height, FilterType::Lanczos3);
            *frame = Frame::from_parts(resized, frame.left(), frame.top(), frame.delay());
        }
    }));

    match result {
        Ok(_) => Ok(()),
        Err(_) => Err(worker::Error::RustError("Failed to resize frames".into())),
    }
}

/// Calculates new dimensions that fit within MIN_DIMENSION and MAX_DIMENSION.
///
/// Maintains the original aspect ratio while scaling to fit constraints.
///
/// # Arguments
///
/// * `width` - Original width in pixels
/// * `height` - Original height in pixels
///
/// # Returns
///
/// A tuple of (new_width, new_height) in pixels.
fn calculate_new_dimensions(width: u32, height: u32) -> (u32, u32) {
    // Calculate scale factor to shrink oversized images
    let max_scale = if width > MAX_DIMENSION || height > MAX_DIMENSION {
        let width_ratio = MAX_DIMENSION as f32 / width as f32;
        let height_ratio = MAX_DIMENSION as f32 / height as f32;
        Some(width_ratio.min(height_ratio))
    } else {
        None
    };

    // Calculate scale factor to enlarge undersized images
    let min_scale = if width < MIN_DIMENSION || height < MIN_DIMENSION {
        let width_ratio = MIN_DIMENSION as f32 / width as f32;
        let height_ratio = MIN_DIMENSION as f32 / height as f32;
        Some(width_ratio.max(height_ratio))
    } else {
        None
    };

    // Apply the appropriate scale factor (or 1.0 if no scaling needed)
    let scale = max_scale.or(min_scale).unwrap_or(1.0);
    let new_width = (width as f32 * scale).round() as u32;
    let new_height = (height as f32 * scale).round() as u32;

    (new_width, new_height)
}
