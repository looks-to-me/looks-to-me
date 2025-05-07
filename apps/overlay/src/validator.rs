use worker::*;

/// Validates the request path against allowed criteria.
///
/// The path must:
/// - Not be empty
/// - Contain only ASCII alphabetic characters (a-z, A-Z)
/// - Be at most 16 characters long
///
/// # Arguments
///
/// * `path` - The path string to validate
///
/// # Errors
///
/// Returns an error if the path doesn't meet the validation criteria.
pub fn validate_path(path: String) -> Result<()> {
    if path.is_empty() {
        Err(Error::RustError("Path cannot be empty".into()))
    } else if !path.chars().all(|c| c.is_ascii_alphabetic()) {
        Err(Error::RustError(
            "Path must contain only alphabetic characters".into(),
        ))
    } else if path.len() > 16 {
        Err(Error::RustError(
            "Path must be at most 16 characters".into(),
        ))
    } else {
        Ok(())
    }
}
