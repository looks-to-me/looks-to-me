import { databaseFactory } from '@looks-to-me/package-database-testing';
import { beforeEach, describe, expect, test } from 'vitest';

import { findMutedUserByViewer } from './find-muted-user-by-viewer';

import type { FindMutedUserByViewerInput } from './find-muted-user-by-viewer';

describe('findMutedUserByViewer', () => {
  beforeEach(async () => {
    const viewer = await databaseFactory.users.create({
      id: 'user-1',
    });

    await databaseFactory.userProfiles.create({
      userId: viewer.id,
      name: 'user1',
      displayName: 'User One',
    });

    const target = await databaseFactory.users.create({
      id: 'user-2',
    });

    await databaseFactory.userProfiles.create({
      userId: target.id,
      name: 'user2',
      displayName: 'User Two',
    });
  });

  describe('when the viewer has not muted the target user', () => {
    const input: FindMutedUserByViewerInput = {
      userId: 'user-1',
      targetUserId: 'user-2',
    };

    test('should return undefined', async () => {
      const result = await findMutedUserByViewer(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toBeUndefined();
      });
    });
  });

  describe('when the viewer has muted the target user', () => {
    const input: FindMutedUserByViewerInput = {
      userId: 'user-1',
      targetUserId: 'user-2',
    };

    beforeEach(async () => {
      await databaseFactory.muteUsers.create({
        userId: input.userId,
        muteUserId: input.targetUserId,
      });
    });

    test('should return the target user', async () => {
      const result = await findMutedUserByViewer(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toEqual({
          id: 'user-2',
          name: 'user2',
          displayName: 'User Two',
        });
      });
    });
  });
});
