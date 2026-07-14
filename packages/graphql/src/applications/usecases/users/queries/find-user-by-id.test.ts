import { databaseFactory } from '@looks-to-me/package-database-testing';
import { beforeEach, describe, expect, test } from 'vitest';

import { findUserById } from './find-user-by-id';

import type { FindUserByIdInput } from './find-user-by-id';

describe('findUserById', () => {
  describe('when user does not exist', () => {
    const input: FindUserByIdInput = {
      id: 'non-existent-id',
    };

    test('should return undefined', async () => {
      const result = await findUserById(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toBeUndefined();
      });
    });
  });

  describe('when user exists', () => {
    const input: FindUserByIdInput = {
      id: 'user-1',
    };

    beforeEach(async () => {
      const user = await databaseFactory.users.create({
        id: input.id,
      });

      await databaseFactory.userProfiles.create({
        userId: user.id,
        name: 'user1',
        displayName: 'User One',
      });
    });

    test('should return the user', async () => {
      const result = await findUserById(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toEqual({
          id: 'user-1',
          name: 'user1',
          displayName: 'User One',
        });
      });
    });
  });
});
