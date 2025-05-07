import { hasBit } from './helpers/has-bit';
import { matchBytes } from './helpers/match-bytes';
import { readBytes } from './helpers/read-bytes';

export type ImageMetadata = {
  mime: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
  animated: boolean;
};

export const getImageMetadata = async (arrayOrStream: Uint8Array | ReadableStream<Uint8Array>): Promise<ImageMetadata | undefined> => {
  const bytes = arrayOrStream instanceof Uint8Array ? arrayOrStream : await readBytes(arrayOrStream, 42);

  if (matchBytes(bytes, new Uint8Array([0xFF, 0xD8, 0xFF]))) {
    return {
      mime: 'image/jpeg',
      animated: false,
    };
  }

  if (matchBytes(bytes, new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]))) {
    if (matchBytes(bytes, new Uint8Array([0x00, 0x00, 0x00, 0x08, 0x61, 0x63, 0x54, 0x4C]), 33)) {
      return {
        mime: 'image/png',
        animated: true,
      };
    }

    return {
      mime: 'image/png',
      animated: false,
    };
  }

  if (matchBytes(bytes, new Uint8Array([0x47, 0x49, 0x46]))) {
    return {
      mime: 'image/gif',
      animated: true,
    };
  }

  if (
    matchBytes(bytes, new Uint8Array([0x52, 0x49, 0x46, 0x46]))
    && matchBytes(bytes, new Uint8Array([0x57, 0x45, 0x42, 0x50]), 8)
  ) {
    if (
      matchBytes(bytes, new Uint8Array([0x56, 0x50, 0x38, 0x58]), 12)
      && hasBit(bytes[17]!, 1)
    ) {
      return {
        mime: 'image/webp',
        animated: true,
      };
    }

    return {
      mime: 'image/webp',
      animated: false,
    };
  }

  return undefined;
};
