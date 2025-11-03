import { database } from '@looks-to-me/package-database';
import { createId } from '@paralleldrive/cuid2';
import { R } from '@praha/byethrow';
import { ErrorFactory } from '@praha/error-factory';
import { UnexpectedError, UnreachableError } from '@praha/error-factory/presets';
import { eq } from 'drizzle-orm';

import { env } from '../../../../contexts';

import type { Post } from '../types/post';

export type CreatePostInput = {
  userId: string;
  image: File;
  width: number;
  height: number;
  word: string;
};

export type CreatePostOutput = (
  | Post
);

export class CreatePostWordMustBeAlphabeticError extends ErrorFactory({
  name: 'CreatePostWordMustBeAlphabeticError',
  message: 'The word must contain only alphabetic characters.',
}) {}

export class CreatePostWordTooLongError extends ErrorFactory({
  name: 'CreatePostWordTooLongError',
  message: 'The word exceeds the maximum allowed length.',
}) {}

export class CreatePostWordTooShortError extends ErrorFactory({
  name: 'CreatePostWordTooShortError',
  message: 'The word is shorter than the minimum required length.',
}) {}

export type CreatePostError = (
  | CreatePostWordMustBeAlphabeticError
  | CreatePostWordTooLongError
  | CreatePostWordTooShortError
  | UnexpectedError
  | UnreachableError
);

export type CreatePost = (input: CreatePostInput) => R.ResultAsync<CreatePostOutput, CreatePostError>;

export const createPost: CreatePost = (input) => {
  const validate = (input: CreatePostInput) => {
    if (!/^[A-Za-z]+$/.test(input.word)) {
      return R.fail(new CreatePostWordMustBeAlphabeticError());
    }
    if (16 < input.word.length) {
      return R.fail(new CreatePostWordTooLongError());
    }
    if (input.word.length <= 0) {
      return R.fail(new CreatePostWordTooShortError());
    }
    return R.succeed(input);
  };

  const createImage = (input: R.InferSuccess<typeof validate>) => R.pipe(
    R.try({
      try: async () => {
        return database()
          .insert(database.schema.images)
          .values({
            id: createId(),
            userId: input.userId,
            width: input.width,
            height: input.height,
            uploadedAt: new Date(),
          })
          .returning();
      },
      catch: (error) => new UnexpectedError({ cause: error }),
    }),
    R.andThen((rows) => {
      if (rows.length) return R.succeed(rows[0]!);
      return R.fail(new UnreachableError({ reason: 'Image creation failed but no error was thrown.' }));
    }),
  );

  const deleteImage = R.fn({
    try: (id: string) => {
      return database()
        .delete(database.schema.images)
        .where(eq(database.schema.images.id, id));
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  const createPost = (input: R.InferSuccess<typeof validate>, image: R.InferSuccess<typeof createImage>) => R.pipe(
    R.try({
      try: async () => {
        return database()
          .insert(database.schema.posts)
          .values({
            id: createId(),
            userId: input.userId,
            imageId: image.id,
            word: input.word,
            postedAt: new Date(),
          })
          .returning();
      },
      catch: (error) => new UnexpectedError({ cause: error }),
    }),
    R.andThen((rows) => {
      if (rows.length) return R.succeed(rows[0]!);
      return R.fail(new UnreachableError({ reason: 'Post creation failed but no error was thrown.' }));
    }),
  );

  const deletePost = R.fn({
    try: (id: string) => {
      return database()
        .delete(database.schema.posts)
        .where(eq(database.schema.posts.id, id));
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  const uploadFile = R.fn({
    try: (key: string, file: File) => {
      return env().BUCKET.put(key, file);
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  const deleteFile = R.fn({
    try: (key: string) => {
      return env().BUCKET.delete(key);
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  const tryFetch = (url: string) => R.pipe(
    R.try({
      try: async () => fetch(url),
      catch: (error) => new UnexpectedError({ cause: error }),
    }),
    R.andThen(async (response) => {
      if (!response.ok) {
        return R.fail(new UnexpectedError({ cause: new Error(await response.text()) }));
      }
      return R.succeed(response);
    }),
  );

  return R.pipe(
    R.do(),
    R.bind('input', () => validate(input)),
    R.bind('image', ({ input }) => createImage(input)),
    R.bind('post', ({ input, image }) => createPost(input, image)),
    R.andThrough(({ input, image, post }) => {
      const bucketKey = `users/${input.userId}/images/${image.id}`;
      return R.pipe(
        R.do(),
        R.andThrough(() => uploadFile(bucketKey, input.image)),
        R.andThrough(() => tryFetch(`${env().APP_ORIGIN}/images/posts/${post.id}`)),
        R.inspectError(async () => {
          await deleteFile(bucketKey);
          await deletePost(post.id);
          await deleteImage(image.id);
        }),
      );
    }),
    R.map(({ post }) => ({
      id: post.id,
      word: post.word,
    })),
  );
};
