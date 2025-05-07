import { describe, it, expect } from 'vitest';

import { getImageMetadata } from './index';

const makeStream = (data: Uint8Array): ReadableStream<Uint8Array> => {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });
};

describe('getImageMetadata', () => {
  describe('JPEG', () => {
    const HEADER = new Uint8Array([0xFF, 0xD8, 0xFF]);

    it('should return image/jpeg and animated=false for JPEG Uint8Array input', async () => {
      const buf = new Uint8Array(10);
      buf.set(HEADER);

      const meta = await getImageMetadata(buf);

      expect(meta).toEqual({ mime: 'image/jpeg', animated: false });
    });

    it('should return image/jpeg and animated=false for JPEG ReadableStream input', async () => {
      const buf = new Uint8Array(42);
      buf.set(HEADER);
      const stream = makeStream(buf);

      const meta = await getImageMetadata(stream);

      expect(meta).toEqual({ mime: 'image/jpeg', animated: false });
    });
  });

  describe('PNG', () => {
    const SIGNATURE = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

    it('should return image/png and animated=false for static PNG', async () => {
      const buf = new Uint8Array(42);
      buf.set(SIGNATURE);

      const meta = await getImageMetadata(buf);

      expect(meta).toEqual({ mime: 'image/png', animated: false });
    });

    it('should return image/png and animated=true for animated PNG', async () => {
      const buf = new Uint8Array(42);
      buf.set(SIGNATURE);
      buf.set([0x00, 0x00, 0x00, 0x08, 0x61, 0x63, 0x54, 0x4C], 33);

      const meta = await getImageMetadata(buf);

      expect(meta).toEqual({ mime: 'image/png', animated: true });
    });
  });

  describe('GIF', () => {
    const SIGNATURE = new Uint8Array([0x47, 0x49, 0x46]);

    it('should return image/gif and animated=true for GIF', async () => {
      const buf = new Uint8Array(10);
      buf.set(SIGNATURE);

      const meta = await getImageMetadata(buf);

      expect(meta).toEqual({ mime: 'image/gif', animated: true });
    });
  });

  describe('WebP', () => {
    const RIFF = new Uint8Array([0x52, 0x49, 0x46, 0x46]);
    const WEBP = new Uint8Array([0x57, 0x45, 0x42, 0x50]);
    const VP8X = new Uint8Array([0x56, 0x50, 0x38, 0x58]);

    it('should return image/webp and animated=false for static WebP', async () => {
      const buf = new Uint8Array(20);
      buf.set(RIFF, 0);
      buf.set(WEBP, 8);

      const meta = await getImageMetadata(buf);

      expect(meta).toEqual({ mime: 'image/webp', animated: false });
    });

    it('should return image/webp and animated=true for animated WebP', async () => {
      const buf = new Uint8Array(20);
      buf.set(RIFF, 0);
      buf.set(WEBP, 8);
      buf.set(VP8X, 12);
      buf[17] = 0b0000_0010;

      const meta = await getImageMetadata(buf);

      expect(meta).toEqual({ mime: 'image/webp', animated: true });
    });
  });

  describe('Unknown data', () => {
    it('should return undefined for unknown data', async () => {
      const buf = new Uint8Array([0x00, 0x11, 0x22, 0x33]);

      const meta = await getImageMetadata(buf);

      expect(meta).toBeUndefined();
    });
  });
});
