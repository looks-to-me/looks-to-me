import { database } from '@looks-to-me/package-database';
import { databaseFactory } from '@looks-to-me/package-database-testing';
import { and, eq } from 'drizzle-orm';
import { beforeEach, describe, expect, test } from 'vitest';

import { MuteUserCannotMuteSelfError, MuteUserNotFoundUserError, muteUser } from './mute-user';

import type { MuteUserInput } from './mute-user';

describe('muteUser', () => {
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
    const input: MuteUserInput = {
      userId: 'user-1',
      targetUserId: 'user-1',
    };

    test('should return MuteUserCannotMuteSelfError', async () => {
      const result = await muteUser(input);

      expect(result).toBeFailure((error) => {
        expect(error).toBeInstanceOf(MuteUserCannotMuteSelfError);
      });
    });
  });

  describe('when the user does not exist', () => {
    const input: MuteUserInput = {
      userId: 'non-existent-id',
      targetUserId: 'user-1',
    };

    test('should return MuteUserNotFoundUserError', async () => {
      const result = await muteUser(input);

      expect(result).toBeFailure((error) => {
        expect(error).toBeInstanceOf(MuteUserNotFoundUserError);
      });
    });
  });

  describe('when the target user does not exist', () => {
    const input: MuteUserInput = {
      userId: 'user-1',
      targetUserId: 'non-existent-id',
    };

    test('should return MuteUserNotFoundUserError', async () => {
      const result = await muteUser(input);

      expect(result).toBeFailure((error) => {
        expect(error).toBeInstanceOf(MuteUserNotFoundUserError);
      });
    });
  });

  describe('when the target user exists', () => {
    const input: MuteUserInput = {
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
    });

    test('should return the target user and mute the target user', async () => {
      const result = await muteUser(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toEqual({
          id: 'user-2',
          name: 'user2',
          displayName: 'User Two',
        });
      });
    });

    test('should mute the target user', async () => {
      await muteUser(input);

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

      expect(mutedUser).toEqual({
        userId: input.userId,
        muteUserId: input.targetUserId,
      });
    });
  });
});
