use ab_glyph::{Font, FontRef};
use worker::*;

/// Embedded bold font data.
static FONT_BOLD: &[u8] = include_bytes!("../assets/Inter_Bold.ttf");

/// Loads the bold font from embedded assets.
///
/// # Errors
///
/// Returns an error if the font fails to load.
pub fn load_font_bold() -> Result<FontRef<'static>> {
    FontRef::try_from_slice(FONT_BOLD)
        .map_err(|_| Error::RustError("Failed to load bold font".into()))
}

/// Embedded regular font data.
static FONT_REGULAR: &[u8] = include_bytes!("../assets/Inter_Regular.ttf");

/// Loads the regular font from embedded assets.
///
/// # Errors
///
/// Returns an error if the font fails to load.
pub fn load_font_regular() -> Result<FontRef<'static>> {
    FontRef::try_from_slice(FONT_REGULAR)
        .map_err(|_| Error::RustError("Failed to load regular font".into()))
}

/// Calculates the width of the given text string when rendered with the specified font.
///
/// # Arguments
///
/// * `font` - The font to use for measurement
/// * `text` - The text string to measure
///
/// # Returns
///
/// The width of the text in pixels.
pub fn calculate_text_width<F: Font>(font: &F, text: &str) -> f32 {
    text.chars()
        .map(|c| font.h_advance_unscaled(font.glyph_id(c)))
        .sum()
}
