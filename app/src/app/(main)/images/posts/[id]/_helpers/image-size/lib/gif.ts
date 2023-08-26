import { toUTF8String, readUInt16LE } from './utils';

const gifRegexp = /^GIF8[79]a/;

const validate = (input: Uint8Array) => {
  return gifRegexp.test(toUTF8String(input, 0, 6));
};

const calculate = (input: Uint8Array) => {
  return {
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6),
  };
};

export const GIF = {
  calculate,
  validate,
};
