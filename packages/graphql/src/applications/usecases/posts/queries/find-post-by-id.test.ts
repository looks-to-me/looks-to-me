import { databaseFactory } from '@looks-to-me/package-database-testing';
import { beforeEach, describe, expect, test } from 'vitest';

import { findPostById } from './find-post-by-id';

import type { FindPostByIdInput } from './find-post-by-id';

describe('findPostById', () => {
  describe('when post does not exist', () => {
    const input: FindPostByIdInput = {
      id: 'non-existent-post',
    };

    test('should return undefined', async () => {
      const result = await findPostById(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toBeUndefined();
      });
    });
  });

  describe('when post exists', () => {
    const input: FindPostByIdInput = {
      id: 'post-1',
    };

    beforeEach(async () => {
      const user = await databaseFactory.users.create({
        id: 'user-1',
      });

      await databaseFactory.posts.create({
        id: input.id,
        userId: user.id,
        word: 'hello',
      });
    });

    test('should return the post', async () => {
      const result = await findPostById(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toEqual({
          id: 'post-1',
          word: 'hello',
        });
      });
    });
  });
});
