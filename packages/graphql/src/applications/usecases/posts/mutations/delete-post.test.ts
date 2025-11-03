import { database } from '@looks-to-me/package-database';
import { databaseFactory } from '@looks-to-me/package-database-testing';
import { eq } from 'drizzle-orm';
import { beforeEach, describe, expect, test } from 'vitest';

import { DeletePostForbiddenError, DeletePostNotFoundError, deletePost } from './delete-post';

import type { DeletePostInput } from './delete-post';

describe('deletePost', () => {
  beforeEach(async () => {
    const user = await databaseFactory.users.create({
      id: 'user-1',
    });

    await databaseFactory.posts.create({
      id: 'post-1',
      userId: user.id,
      word: 'hello',
    });
  });

  describe('when the post does not exist', () => {
    const input: DeletePostInput = {
      id: 'non-existent-post',
      userId: 'user-1',
    };

    test('should return DeletePostNotFoundError', async () => {
      const result = await deletePost(input);

      expect(result).toBeFailure((error) => {
        expect(error).toBeInstanceOf(DeletePostNotFoundError);
      });
    });
  });

  describe('when the user is not the owner of the post', () => {
    const input: DeletePostInput = {
      id: 'post-1',
      userId: 'user-2',
    };

    test('should return DeletePostForbiddenError', async () => {
      const result = await deletePost(input);

      expect(result).toBeFailure((error) => {
        expect(error).toBeInstanceOf(DeletePostForbiddenError);
      });
    });
  });

  describe('when the user is the owner of the post', () => {
    const input: DeletePostInput = {
      id: 'post-1',
      userId: 'user-1',
    };

    test('should return the deleted post', async () => {
      const result = await deletePost(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toEqual({
          id: 'post-1',
          word: 'hello',
        });
      });
    });

    test('should delete the post', async () => {
      await deletePost(input);

      const post = await database()
        .select()
        .from(database.schema.posts)
        .where(eq(database.schema.posts.id, input.id))
        .get();

      expect(post).toBeUndefined();
    });
  });
});
