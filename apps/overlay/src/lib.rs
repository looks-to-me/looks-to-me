mod decoder;
mod encoder;
mod font;
mod overlay;
mod resizer;
mod validator;

use crate::decoder::collect_frames;
use crate::encoder::{encode_gif, encode_webp};
use crate::overlay::apply_text_overlay;
use crate::resizer::resize_frames;
use crate::validator::validate_path;
use worker::*;

#[event(fetch)]
async fn main(mut request: Request, _env: Env, _ctx: Context) -> Result<Response> {
    let path = request.path().trim_matches('/').to_string();

    if let Err(error) = validate_path(path.clone()) {
        return Response::error(error.to_string(), 400);
    }

    let bytes = match request.bytes().await {
        Ok(bytes) => bytes,
        Err(_) => return Response::error("Failed to read request body".to_string(), 500),
    };

    let mut frames = match collect_frames(&bytes) {
        Ok(frames) if !frames.is_empty() => frames,
        Ok(_) => return Response::error("No frames found".to_string(), 500),
        Err(err) => return Response::error(err.to_string(), 500),
    };

    if let Err(error) = resize_frames(&mut frames) {
        return Response::error(error.to_string(), 500);
    }

    if let Err(error) = apply_text_overlay(path, &mut frames) {
        return Response::error(error.to_string(), 500);
    }

    let (bytes, content_type) = if frames.len() > 1 {
        match encode_gif(frames) {
            Ok(buf) => (buf, "image/gif"),
            Err(error) => return Response::error(error.to_string(), 500),
        }
    } else {
        match encode_webp(&frames[0]) {
            Ok(buf) => (buf, "image/webp"),
            Err(error) => return Response::error(error.to_string(), 500),
        }
    };

    let headers = Headers::new();
    headers.set("Content-Type", content_type)?;
    Response::from_bytes(bytes)
        .map(|response| response.with_headers(headers))
        .map_err(|_| Error::RustError("Failed to build response".into()))
}
