import { readUInt32BE, toUTF8String } from './utils';

const pngSignature = 'PNG\r\n\x1a\n';
// Used to detect "fried" png's: http://www.jongware.com/pngdefry.html
const pngFriedChunkName = 'CgBI';
const pngImageHeaderChunkName = 'IHDR';

const calculate = (input: Uint8Array) => {
  if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
    return {
      height: readUInt32BE(input, 36),
      width: readUInt32BE(input, 32),
    };
  }
  return {
    height: readUInt32BE(input, 20),
    width: readUInt32BE(input, 16),
  };
};

const validate = (input: Uint8Array) => {
  if (pngSignature === toUTF8String(input, 1, 8)) {
    let chunkName = toUTF8String(input, 12, 16);
    if (chunkName === pngFriedChunkName) {
      chunkName = toUTF8String(input, 28, 32);
    }
    if (chunkName !== pngImageHeaderChunkName) {
      throw new TypeError('Invalid PNG');
    }
    return true;
  }
  return false;
};

export const PNG = {
  calculate,
  validate,
};
