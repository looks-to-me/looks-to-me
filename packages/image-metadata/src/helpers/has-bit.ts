export const hasBit = (byte: number, bitIndex: number): boolean => {
  if (bitIndex < 0 || bitIndex > 7) {
    throw new RangeError('bitIndex must be between 0 and 7');
  }

  return ((byte >> bitIndex) & 1) === 1;
};
