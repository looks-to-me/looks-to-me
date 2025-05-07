import { ReadableStream } from 'node:stream/web';

import { describe, it, expect } from 'vitest';

import { readBytes } from './read-bytes';

const createStream = (chunks: Uint8Array[]): ReadableStream<Uint8Array> => {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });
};

describe('readBytes', () => {
  it('should read exactly `length` bytes from a single chunk', async () => {
    const chunk = new Uint8Array([1, 2, 3, 4, 5]);
    const stream = createStream([chunk]);

    const result = await readBytes(stream, 5);

    expect(result).toEqual(chunk);
  });

  it('should truncate a larger chunk to the requested length', async () => {
    const chunk = new Uint8Array([1, 2, 3, 4, 5, 6, 7]);
    const stream = createStream([chunk]);

    const result = await readBytes(stream, 5);

    expect(result).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
  });

  it('should accumulate across multiple chunks until reaching `length`', async () => {
    const chunks = [
      new Uint8Array([1, 2]),
      new Uint8Array([3, 4]),
      new Uint8Array([5]),
    ];
    const stream = createStream(chunks);

    const result = await readBytes(stream, 5);

    expect(result).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
  });

  it('should return zeros for missing bytes when stream ends early', async () => {
    const chunks = [new Uint8Array([1, 2])];
    const stream = createStream(chunks);

    const result = await readBytes(stream, 5);

    expect(result).toEqual(new Uint8Array([1, 2, 0, 0, 0]));
  });

  it('should return all zeros when the stream is empty', async () => {
    const stream = createStream([]);

    const result = await readBytes(stream, 4);

    expect(result).toEqual(new Uint8Array([0, 0, 0, 0]));
  });
});
