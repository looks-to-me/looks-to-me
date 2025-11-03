import { databaseFactory } from '@looks-to-me/package-database-testing';
import { beforeEach, describe, expect, test } from 'vitest';

import { findAuthorByPostId } from './find-author-by-post-id';

import type { FindAuthorByPostIdInput } from './find-author-by-post-id';

describe('findAuthorByPostId', () => {
  describe('when post does not exist', () => {
    const input: FindAuthorByPostIdInput = {
      postId: 'non-existent-post',
    };

    test('should return undefined', async () => {
      const result = await findAuthorByPostId(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toBeUndefined();
      });
    });
  });

  describe('when post exists', () => {
    const input: FindAuthorByPostIdInput = {
      postId: 'post-1',
    };

    beforeEach(async () => {
      const user = await databaseFactory.users.create({
        id: 'user-1',
      });

      await databaseFactory.userProfiles.create({
        userId: user.id,
        name: 'user1',
        displayName: 'User One',
      });

      await databaseFactory.posts.create({
        id: input.postId,
        userId: user.id,
      });
    });

    test('should return the author of the post', async () => {
      const result = await findAuthorByPostId(input);

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
