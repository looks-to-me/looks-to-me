use crate::font::{calculate_text_width, load_font_bold, load_font_regular};
use ab_glyph::{Font, PxScale};
use image::imageops::overlay;
use image::{Frame, Rgba, RgbaImage};
use imageproc::drawing::draw_text_mut;

/// Applies a text overlay to all frames.
/// - Title: "L{first_char}TM" (e.g., "LGTM" for "Good")
/// - Subtitle: "Looks {word} To Me"
///
/// # Arguments
/// * `word` - The word to display in the overlay
/// * `frames` - Mutable slice of frames to apply the overlay to
///
/// # Errors
///
/// Returns an error if font loading or text rendering fails.
pub fn apply_text_overlay(word: String, frames: &mut [Frame]) -> worker::Result<()> {
    let first = word.chars().next().unwrap();
    let title = format!("L{first}TM");
    let subtitle = format!("Looks {word} To Me");

    let base = &frames[0].buffer();
    let overlay_img = build_overlay_image(base, &title, &subtitle)?;

    // Center the overlay on the base image
    let x = ((base.width().saturating_sub(overlay_img.width())) / 2) as i64;
    let y = ((base.height().saturating_sub(overlay_img.height())) / 2) as i64;

    for frame in frames.iter_mut() {
        overlay(frame.buffer_mut(), &overlay_img, x, y);
    }

    Ok(())
}

/// Builds an overlay image with the specified title and subtitle.
///
/// # Arguments
///
/// * `image` - Reference image to determine overlay size
/// * `title` - Title text to render (e.g., "LGTM")
/// * `sub_title` - Subtitle text to render (e.g., "Looks Good To Me")
///
/// # Returns
///
/// An `RgbaImage` containing the rendered overlay.
///
/// # Errors
///
/// Returns an error if font loading or text rendering fails.
fn build_overlay_image(
    image: &RgbaImage,
    title: &str,
    sub_title: &str,
) -> worker::Result<RgbaImage> {
    let font_bold = load_font_bold()?;
    let font_regular = load_font_regular()?;

    // Create a transparent canvas for the overlay
    let (width, height) = calculate_overlay_dimensions(image);
    let mut out = RgbaImage::from_pixel(width, height, Rgba([0, 0, 0, 0]));

    let padding = (width as f32) * 0.15;
    let text_width = (width as f32) - padding * 2.0;
    let text_width_unscaled_title = calculate_text_width(&font_bold, title);
    let text_width_unscaled_sub_title = calculate_text_width(&font_regular, sub_title);
    let scale_title = text_width / text_width_unscaled_title * font_bold.height_unscaled();
    let scale_sub_title = scale_title * 0.25;
    let total_height = (scale_title + scale_sub_title).ceil() as i32;
    let y0 = ((height as i32 - total_height) / 2).max(0);

    // Render title text (centered horizontally)
    let title_text_ratio = scale_title / font_bold.height_unscaled();
    let title_text_width = text_width_unscaled_title * title_text_ratio;
    let x = ((width as f32 - title_text_width) / 2.0).round() as i32;
    draw_text(&mut out, x, y0, scale_title, &font_bold, title);

    // Render subtitle text (centered horizontally, positioned below title)
    let sub_title_text_ratio = scale_sub_title / font_regular.height_unscaled();
    let sub_title_text_width = text_width_unscaled_sub_title * sub_title_text_ratio;
    let x = ((width as f32 - sub_title_text_width) / 2.0).round() as i32;
    let y = y0 + (scale_title as i32);
    draw_text(&mut out, x, y, scale_sub_title, &font_regular, sub_title);

    Ok(out)
}

/// Calculates optimal overlay dimensions maintaining a 4:3 aspect ratio.
///
/// This function determines the largest possible 4:3 rectangle that fits within
/// the given image dimensions. The overlay will use the full width or height of
/// the image (whichever is the limiting factor) while maintaining the aspect ratio.
///
/// # Arguments
///
/// * `image` - Reference image to calculate overlay dimensions for
///
/// # Returns
///
/// A tuple `(width, height)` representing the overlay dimensions in pixels.
///
/// # Algorithm
///
/// - For portrait images (width < height): Try to use full width with 3:4 height ratio
/// - For landscape images (width >= height): Try to use full height with 4:3 width ratio
/// - If the calculated dimension exceeds the image bounds, swap the approach
///
/// # Examples
///
/// - Image 1920x1080 → Overlay 1440x1080 (4:3 ratio, limited by height)
/// - Image 800x1200 → Overlay 800x600 (4:3 ratio, limited by width)
fn calculate_overlay_dimensions(image: &RgbaImage) -> (u32, u32) {
    let (image_width, image_height) = (image.width(), image.height());
    if image_width < image_height {
        // Portrait orientation
        let target_height = (image_width as f32 * 3.0 / 4.0).round() as u32;
        if target_height <= image_height {
            (image_width, target_height)
        } else {
            let target_width = (image_height as f32 * 4.0 / 3.0).round() as u32;
            (target_width, image_height)
        }
    } else {
        // Landscape orientation
        let target_width = (image_height as f32 * 4.0 / 3.0).round() as u32;
        if target_width <= image_width {
            (target_width, image_height)
        } else {
            let target_height = (image_width as f32 * 3.0 / 4.0).round() as u32;
            (image_width, target_height)
        }
    }
}

/// Draws text with a black outline for better visibility.
///
/// This function renders text with a stroke/outline effect by first drawing
/// the text in black in 8 surrounding positions, then drawing the main text
/// in white on top. This creates high contrast and ensures the text is readable
/// on any background.
///
/// # Arguments
///
/// * `buf` - The image buffer to draw on
/// * `x` - Horizontal position (left edge of text)
/// * `y` - Vertical position (baseline of text)
/// * `scale` - Font scale/size
/// * `font` - Font to use for rendering
/// * `text` - Text string to render
///
/// # Generic Parameters
///
/// * `F` - Any type implementing the `Font` trait from ab_glyph
///
/// # Rendering Order
///
/// 1. Black outline: 8 positions around the center (offset by ±1 pixel)
/// 2. White text: center position
fn draw_text<F: Font>(
    buf: &mut RgbaImage,
    x: i32,
    y: i32,
    scale: impl Into<PxScale> + Copy,
    font: &F,
    text: &str,
) {
    // Draw black outline
    for dy in -1..=1 {
        for dx in -1..=1 {
            if dx == 0 && dy == 0 {
                continue;
            }
            draw_text_mut(buf, Rgba([0, 0, 0, 255]), x + dx, y + dy, scale, font, text);
        }
    }

    // Draw white text
    draw_text_mut(buf, Rgba([255, 255, 255, 255]), x, y, scale, font, text);
}
