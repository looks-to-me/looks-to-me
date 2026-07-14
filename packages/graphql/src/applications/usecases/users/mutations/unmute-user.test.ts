import { database } from '@looks-to-me/package-database';
import { databaseFactory } from '@looks-to-me/package-database-testing';
import { and, eq } from 'drizzle-orm';
import { beforeEach, describe, expect, test } from 'vitest';

import { UnmuteUserCannotUnmuteSelfError, UnmuteUserNotFoundUserError, unmuteUser } from './unmute-user';

import type { UnmuteUserInput } from './unmute-user';

describe('unmuteUser', () => {
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

  describe('when userId and targetUserId are the same', () => {
    const input: UnmuteUserInput = {
      userId: 'user-1',
      targetUserId: 'user-1',
    };

    test('should return UnmuteUserCannotUnmuteSelfError', async () => {
      const result = await unmuteUser(input);

      expect(result).toBeFailure((error) => {
        expect(error).toBeInstanceOf(UnmuteUserCannotUnmuteSelfError);
      });
    });
  });

  describe('when the user does not exist', () => {
    const input: UnmuteUserInput = {
      userId: 'non-existent-id',
      targetUserId: 'user-1',
    };

    test('should return UnmuteUserNotFoundUserError', async () => {
      const result = await unmuteUser(input);

      expect(result).toBeFailure((error) => {
        expect(error).toBeInstanceOf(UnmuteUserNotFoundUserError);
      });
    });
  });

  describe('when the target user does not exist', () => {
    const input: UnmuteUserInput = {
      userId: 'user-1',
      targetUserId: 'non-existent-id',
    };

    test('should return UnmuteUserNotFoundUserError', async () => {
      const result = await unmuteUser(input);

      expect(result).toBeFailure((error) => {
        expect(error).toBeInstanceOf(UnmuteUserNotFoundUserError);
      });
    });
  });

  describe('when the target user exists', () => {
    const input: UnmuteUserInput = {
      userId: 'user-1',
      targetUserId: 'user-2',
    };

    beforeEach(async () => {
      const targetUser = await databaseFactory.users.create({
        id: input.targetUserId,
      });

      await databaseFactory.userProfiles.create({
        userId: targetUser.id,
        name: 'user2',
        displayName: 'User Two',
      });

      await databaseFactory.muteUsers.create({
        userId: input.userId,
        muteUserId: input.targetUserId,
      });
    });

    test('should return the target user and unmute the target user', async () => {
      const result = await unmuteUser(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toEqual({
          id: 'user-1',
          name: 'user1',
          displayName: 'User One',
        });
      });
    });

    test('should unmute the target user', async () => {
      await unmuteUser(input);

      const mutedUser = await database()
        .select()
        .from(database.schema.muteUsers)
        .where(
          and(
            eq(database.schema.muteUsers.userId, input.userId),
            eq(database.schema.muteUsers.muteUserId, input.targetUserId),
          ),
        )
        .get();

      expect(mutedUser).toBeUndefined();
    });
  });
});
