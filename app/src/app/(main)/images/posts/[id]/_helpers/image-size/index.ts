import { GIF } from './lib/gif';
import { JPEG } from './lib/jpeg';
import { PNG } from './lib/png';

export type ImageSize = {
  width: number;
  height: number;
};

export const getImageSize = (buffer: Uint8Array): ImageSize => {
  if (PNG.validate(buffer)) {
    return PNG.calculate(buffer);
  }

  if (JPEG.validate(buffer)) {
    return JPEG.calculate(buffer);
  }

  if (GIF.validate(buffer)) {
    return GIF.calculate(buffer);
  }

  throw Error('not supported format');
};
