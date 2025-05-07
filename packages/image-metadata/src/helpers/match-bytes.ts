export const matchBytes = (
  data: Uint8Array,
  pattern: Uint8Array,
  offset: number = 0,
): boolean => {
  const end = offset + pattern.length;
  if (offset < 0 || end > data.length) {
    return false;
  }

  const slice = data.subarray(offset, end);
  return pattern.every((b, index) => slice[index] === b);
};
