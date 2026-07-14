import { databaseFactory } from '@looks-to-me/package-database-testing';
import { beforeEach, describe, expect, test } from 'vitest';

import { findPostsByRandom } from './find-posts-by-random';

import type { FindPostsByRandomInput } from './find-posts-by-random';

describe('findPostsByRandom', () => {
  const limit = 3;

  describe('when posts does not exist', () => {
    const input: FindPostsByRandomInput = {
      userId: undefined,
      limit,
    };

    test('should return empty array', async () => {
      const result = await findPostsByRandom(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toHaveLength(0);
      });
    });
  });

  describe('when posts exist', () => {
    beforeEach(async () => {
      const users = await databaseFactory.users.create([
        { id: 'user-1' },
        { id: 'user-2' },
        { id: 'user-3' },
      ]);

      await databaseFactory.posts.create([
        { id: 'post-1', userId: users[0].id },
        { id: 'post-2', userId: users[1].id },
        { id: 'post-3', userId: users[2].id },
      ]);
    });

    describe('when userId is not provided', () => {
      const input: FindPostsByRandomInput = {
        userId: undefined,
        limit,
      };

      test('should return posts', async () => {
        const result = await findPostsByRandom(input);

        expect(result).toBeSuccess((value) => {
          expect(value).toHaveLength(3);
        });
      });
    });

    describe('when userId is provided', () => {
      const input: FindPostsByRandomInput = {
        userId: 'user-1',
        limit,
      };

      test('should return posts', async () => {
        const result = await findPostsByRandom(input);

        expect(result).toBeSuccess((value) => {
          expect(value).toHaveLength(3);
        });
      });

      describe('when user muted another user', () => {
        beforeEach(async () => {
          await databaseFactory.muteUsers.create({
            userId: 'user-1',
            muteUserId: 'user-2',
          });
        });

        test('should not return posts from muted user', async () => {
          const result = await findPostsByRandom(input);

          expect(result).toBeSuccess((value) => {
            expect(value).toHaveLength(2);
            expect(value).not.toEqual(expect.arrayContaining([
              expect.objectContaining({
                id: 'post-2',
              }),
            ]));
          });
        });
      });
    });
  });
});
