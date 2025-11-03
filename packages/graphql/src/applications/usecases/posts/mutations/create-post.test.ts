import { database } from '@looks-to-me/package-database';
import { databaseFactory } from '@looks-to-me/package-database-testing';
import { mockContext } from '@praha/diva/test';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { CreatePostWordMustBeAlphabeticError, CreatePostWordTooLongError, createPost } from './create-post';
import { withEnv } from '../../../../contexts';

import type { CreatePostInput } from './create-post';

const createFile = () => new File(['image-content'], 'image.png', { type: 'image/png' });

describe('createPost', () => {
  let put: ReturnType<typeof vi.fn>;
  let del: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    put = vi.fn(async () => {});
    del = vi.fn(async () => {});

    mockContext(withEnv, () => ({
      APP_ORIGIN: 'https://example.com',
      BUCKET: {
        put,
        delete: del,
      } as unknown as R2Bucket,
    }));

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 200 })));

    await databaseFactory.users.create({
      id: 'user-1',
    });
  });

  describe('when the word contains non-alphabetic characters', () => {
    const input: CreatePostInput = {
      userId: 'user-1',
      image: createFile(),
      width: 100,
      height: 100,
      word: 'hello1',
    };

    test('should return CreatePostWordMustBeAlphabeticError', async () => {
      const result = await createPost(input);

      expect(result).toBeFailure((error) => {
        expect(error).toBeInstanceOf(CreatePostWordMustBeAlphabeticError);
      });
    });
  });

  describe('when the word exceeds the maximum length', () => {
    const input: CreatePostInput = {
      userId: 'user-1',
      image: createFile(),
      width: 100,
      height: 100,
      word: 'a'.repeat(17),
    };

    test('should return CreatePostWordTooLongError', async () => {
      const result = await createPost(input);

      expect(result).toBeFailure((error) => {
        expect(error).toBeInstanceOf(CreatePostWordTooLongError);
      });
    });
  });

  describe('when the word is empty', () => {
    const input: CreatePostInput = {
      userId: 'user-1',
      image: createFile(),
      width: 100,
      height: 100,
      word: '',
    };

    test('should return CreatePostWordMustBeAlphabeticError', async () => {
      const result = await createPost(input);

      expect(result).toBeFailure((error) => {
        expect(error).toBeInstanceOf(CreatePostWordMustBeAlphabeticError);
      });
    });
  });

  describe('when the input is valid', () => {
    const input: CreatePostInput = {
      userId: 'user-1',
      image: createFile(),
      width: 100,
      height: 100,
      word: 'hello',
    };

    test('should return the created post', async () => {
      const result = await createPost(input);

      expect(result).toBeSuccess((value) => {
        expect(value).toEqual({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          id: expect.any(String),
          word: 'hello',
        });
      });
    });

    test('should save the post and image', async () => {
      const result = await createPost(input);

      expect(result).toBeSuccess();

      const posts = await database().select().from(database.schema.posts).all();
      const images = await database().select().from(database.schema.images).all();

      expect(posts).toHaveLength(1);
      expect(posts[0]).toMatchObject({
        userId: 'user-1',
        word: 'hello',
      });
      expect(images).toHaveLength(1);
      expect(images[0]).toMatchObject({
        userId: 'user-1',
        width: 100,
        height: 100,
      });
    });

    test('should upload the image to the bucket', async () => {
      await createPost(input);

      expect(put).toHaveBeenCalledTimes(1);
    });
  });

  describe('when uploading the image to the bucket fails', () => {
    const input: CreatePostInput = {
      userId: 'user-1',
      image: createFile(),
      width: 100,
      height: 100,
      word: 'hello',
    };

    beforeEach(() => {
      put.mockRejectedValue(new Error('Failed to upload image.'));
    });

    test('should return UnexpectedError', async () => {
      const result = await createPost(input);

      expect(result).toBeFailure((error) => {
        expect(error.name).toBe('UnexpectedError');
      });
    });

    test('should roll back the created post and image', async () => {
      await createPost(input);

      const posts = await database().select().from(database.schema.posts).all();
      const images = await database().select().from(database.schema.images).all();

      expect(posts).toHaveLength(0);
      expect(images).toHaveLength(0);
    });
  });

  describe('when notifying the app fails', () => {
    const input: CreatePostInput = {
      userId: 'user-1',
      image: createFile(),
      width: 100,
      height: 100,
      word: 'hello',
    };

    beforeEach(() => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('notification failed', { status: 500 })));
    });

    test('should return UnexpectedError', async () => {
      const result = await createPost(input);

      expect(result).toBeFailure((error) => {
        expect(error.name).toBe('UnexpectedError');
      });
    });

    test('should roll back the created post, image, and uploaded file', async () => {
      await createPost(input);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const bucketKey = put.mock.calls[0]?.[0];

      const posts = await database().select().from(database.schema.posts).all();
      const images = await database().select().from(database.schema.images).all();

      expect(posts).toHaveLength(0);
      expect(images).toHaveLength(0);
      expect(del).toHaveBeenCalledWith(bucketKey);
    });
  });
});
