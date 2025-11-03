import { databaseFactory } from '@looks-to-me/package-database-testing';
import { beforeEach, describe, expect, test } from 'vitest';

import { findPostsByNewest } from './find-posts-by-newest';

import type { FindPostsByNewestInput } from './find-posts-by-newest';

describe('findPostsByNewest', () => {
  const limit = 3;
  const now = new Date();

  describe('when posts does not exist', () => {
    const input: FindPostsByNewestInput = {
      userId: undefined,
      cursor: undefined,
      limit,
    };

    test('should return empty array', async () => {
      const result = await findPostsByNewest(input);

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
        { id: 'post-1', userId: users[0].id, postedAt: new Date(now.getTime() - 6000) },
        { id: 'post-2', userId: users[1].id, postedAt: new Date(now.getTime() - 5000) },
        { id: 'post-3', userId: users[2].id, postedAt: new Date(now.getTime() - 4000) },
        { id: 'post-4', userId: users[0].id, postedAt: new Date(now.getTime() - 3000) },
        { id: 'post-5', userId: users[1].id, postedAt: new Date(now.getTime() - 2000) },
        { id: 'post-6', userId: users[2].id, postedAt: new Date(now.getTime() - 1000) },
      ]);
    });

    describe('when userId is not provided', () => {
      const input: FindPostsByNewestInput = {
        userId: undefined,
        cursor: undefined,
        limit,
      };

      test('should return posts', async () => {
        const result = await findPostsByNewest(input);

        expect(result).toBeSuccess((value) => {
          expect(value).toHaveLength(3);
          expect(value).toEqual([
            expect.objectContaining({ id: 'post-6' }),
            expect.objectContaining({ id: 'post-5' }),
            expect.objectContaining({ id: 'post-4' }),
          ]);
        });
      });

      describe('when cursor is provided', () => {
        const input: FindPostsByNewestInput = {
          userId: undefined,
          cursor: {
            id: 'post-4',
            postedAt: new Date(now.getTime() - 3000).toISOString(),
          },
          limit,
        };

        test('should return posts after the cursor', async () => {
          const result = await findPostsByNewest(input);

          expect(result).toBeSuccess((value) => {
            expect(value).toHaveLength(3);
            expect(value).toEqual([
              expect.objectContaining({ id: 'post-3' }),
              expect.objectContaining({ id: 'post-2' }),
              expect.objectContaining({ id: 'post-1' }),
            ]);
          });
        });
      });
    });

    describe('when userId is provided', () => {
      const input: FindPostsByNewestInput = {
        userId: 'user-1',
        cursor: undefined,
        limit,
      };

      test('should return posts', async () => {
        const result = await findPostsByNewest(input);

        expect(result).toBeSuccess((value) => {
          expect(value).toHaveLength(3);
          expect(value).toEqual([
            expect.objectContaining({ id: 'post-6' }),
            expect.objectContaining({ id: 'post-5' }),
            expect.objectContaining({ id: 'post-4' }),
          ]);
        });
      });

      describe('when cursor is provided', () => {
        const input: FindPostsByNewestInput = {
          userId: 'user-1',
          cursor: {
            id: 'post-4',
            postedAt: new Date(now.getTime() - 3000).toISOString(),
          },
          limit,
        };

        test('should return posts after the cursor', async () => {
          const result = await findPostsByNewest(input);

          expect(result).toBeSuccess((value) => {
            expect(value).toHaveLength(3);
            expect(value).toEqual([
              expect.objectContaining({ id: 'post-3' }),
              expect.objectContaining({ id: 'post-2' }),
              expect.objectContaining({ id: 'post-1' }),
            ]);
          });
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
          const result = await findPostsByNewest(input);

          expect(result).toBeSuccess((value) => {
            expect(value).toHaveLength(3);
            expect(value).toEqual([
              expect.objectContaining({ id: 'post-6' }),
              expect.objectContaining({ id: 'post-4' }),
              expect.objectContaining({ id: 'post-3' }),
            ]);
          });
        });

        describe('when cursor is provided', () => {
          const input: FindPostsByNewestInput = {
            userId: 'user-1',
            cursor: {
              id: 'post-3',
              postedAt: new Date(now.getTime() - 4000).toISOString(),
            },
            limit,
          };

          test('should return posts after the cursor', async () => {
            const result = await findPostsByNewest(input);

            expect(result).toBeSuccess((value) => {
              expect(value).toHaveLength(1);
              expect(value).toEqual([
                expect.objectContaining({ id: 'post-1' }),
              ]);
            });
          });
        });
      });
    });
  });
});
