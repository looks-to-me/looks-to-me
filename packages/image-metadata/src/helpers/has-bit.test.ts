import { describe, it, expect } from 'vitest';

import { hasBit } from './has-bit';

describe('hasBit', () => {
  describe('true cases', () => {
    it('should return true when the LSB (bit 0) is 1', () => {
      expect(hasBit(0b0000_0001, 0)).toBe(true);
    });

    it('should return true when bit 3 is 1', () => {
      expect(hasBit(0b0000_1000, 3)).toBe(true);
    });

    it('should return true when the MSB (bit 7) is 1', () => {
      expect(hasBit(0b1000_0000, 7)).toBe(true);
    });
  });

  describe('false cases', () => {
    it('should return false when all bits are 0 for bit 0', () => {
      expect(hasBit(0b0000_0000, 0)).toBe(false);
    });

    it('should return false when the LSB (bit 0) is 0', () => {
      expect(hasBit(0b1111_1110, 0)).toBe(false);
    });

    it('should return false when the MSB (bit 7) is 0', () => {
      expect(hasBit(0b0111_1111, 7)).toBe(false);
    });
  });

  describe('out of range cases', () => {
    it('should throw RangeError when bitIndex is less than 0', () => {
      expect(() => hasBit(0, -1)).toThrow(RangeError);
    });

    it('should throw RangeError when bitIndex is greater than 7', () => {
      expect(() => hasBit(0, 8)).toThrow(RangeError);
    });

    it('should throw an error with correct message for invalid bitIndex', () => {
      expect(() => hasBit(0, 100)).toThrowError('bitIndex must be between 0 and 7');
    });
  });
});
