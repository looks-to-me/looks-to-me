const decoder = new TextDecoder();

export const toHexString = (
  input: Uint8Array,
  start = 0,
  end = input.length,
) => {
  return input
    .slice(start, end)
    .reduce((memo, i) => memo + ('0' + i.toString(16)).slice(-2), '');
};

export const toUTF8String = (
  input: Uint8Array,
  start = 0,
  end = input.length,
) => {
  return decoder.decode(input.slice(start, end));
};

export const readUInt16BE = (input: Uint8Array, offset = 0) => {
  return input[offset] as number * 2 ** 8 + (input[offset + 1] as number);
};

export const readUInt16LE = (input: Uint8Array, offset = 0) => {
  return input[offset] as number + (input[offset + 1] as number) * 2 ** 8;
};

export const readUInt32BE = (input: Uint8Array, offset = 0) => {
  return (
    input[offset] as number * 2 ** 24 +
    (input[offset + 1] as number) * 2 ** 16 +
    (input[offset + 2] as number) * 2 ** 8 +
    (input[offset + 3] as number)
  );
};

export const readUInt = (
  input: Uint8Array,
  bits: 16 | 32,
  offset: number,
  isBigEndian: boolean,
) => {
  offset = offset || 0;
  const endian = isBigEndian ? 'BE' : 'LE';
  const methodName: MethodName = ('readUInt' + bits + endian) as MethodName;
  return methods[methodName](input, offset);
};

const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
} as const;
type MethodName = keyof typeof methods;
