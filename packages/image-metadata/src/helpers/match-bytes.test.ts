import { describe, it, expect } from 'vitest';

import { matchBytes } from './match-bytes';

describe('matchBytes', () => {
  const data = new Uint8Array([10, 20, 30, 40, 50]);

  it('should return true when the pattern matches at the start', () => {
    const pattern = new Uint8Array([10, 20, 30]);

    expect(matchBytes(data, pattern)).toBe(true);
  });

  it('should return true when the pattern matches at the specified offset', () => {
    const pattern = new Uint8Array([30, 40]);

    expect(matchBytes(data, pattern, 2)).toBe(true);
  });

  it('should return false when the pattern only partially matches', () => {
    const pattern = new Uint8Array([20, 99]);

    expect(matchBytes(data, pattern, 1)).toBe(false);
  });

  it('should return false if offset is negative', () => {
    const pattern = new Uint8Array([10]);

    expect(matchBytes(data, pattern, -1)).toBe(false);
  });

  it('should return false if offset plus pattern length exceeds data length', () => {
    const pattern = new Uint8Array([40, 50]);

    expect(matchBytes(data, pattern, 4)).toBe(false);
  });
});
