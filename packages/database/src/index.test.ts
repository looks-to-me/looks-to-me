import { describe, expect, test } from 'vitest';

import { database, withDatabase } from './index';

import type { Database } from './index';

describe('database', () => {
  describe('when called outside of withDatabase', () => {
    test('should throw an error', () => {
      expect(() => database()).toThrow();
    });
  });

  describe('when called inside withDatabase', () => {
    const instance = {} as Database;

    test('should retrieve the database client', () => {
      // @ts-ignore
      withDatabase(instance, () => {
        expect(database()).toBe(instance);
      });

      expect.assertions(1);
    });
  });
});
