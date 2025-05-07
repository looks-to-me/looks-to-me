export const readBytes = async (stream: ReadableStream<Uint8Array>, length: number): Promise<Uint8Array> => {
  const bytes = new Uint8Array(length);
  const reader = stream.getReader();

  const read = async (offset: number): Promise<Uint8Array> => {
    const { done, value } = await reader.read();
    if (done || !value) {
      return bytes.subarray(0, length);
    }

    const toCopy = Math.min(value.length, length - offset);
    bytes.set(value.subarray(0, toCopy), offset);
    const nextOffset = offset + toCopy;
    return nextOffset >= length ? bytes : read(nextOffset);
  };

  try {
    return await read(0);
  } finally {
    reader.releaseLock();
  }
};
