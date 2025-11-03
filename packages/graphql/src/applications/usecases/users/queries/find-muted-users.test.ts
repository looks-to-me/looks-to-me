import { databaseFactory } from '@looks-to-me/package-database-testing';
import { beforeEach, describe, expect, test } from 'vitest';

import { findMutedUsers } from './find-muted-users';

import type { FindMutedUsersInput } from './find-muted-users';

describe('findMutedUsers', () => {
  beforeEach(async () => {
    const user = await databaseFactory.users.create({
      id: 'user-1',
    });

    await databaseFactory.userProfiles.create({
      userId: user.id,
      name: 'user1',
      displayName: 'User One',
    });
  });

  describe('when user has not muted anyone', () => {
    const input: FindMutedUsersInput = {
      userId: 'user-1',
    };

    test('should return empty array', async () => {
      const result = await findMutedUsers(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toEqual([]);
      });
    });
  });

  describe('when user has muted other users', () => {
    const input: FindMutedUsersInput = {
      userId: 'user-1',
    };

    beforeEach(async () => {
      const mutedUser = await databaseFactory.users.create({
        id: 'user-2',
      });

      await databaseFactory.userProfiles.create({
        userId: mutedUser.id,
        name: 'user2',
        displayName: 'User Two',
      });

      await databaseFactory.muteUsers.create({
        userId: input.userId,
        muteUserId: mutedUser.id,
      });
    });

    test('should return muted users', async () => {
      const result = await findMutedUsers(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toEqual([
          {
            id: 'user-2',
            name: 'user2',
            displayName: 'User Two',
          },
        ]);
      });
    });
  });
});
