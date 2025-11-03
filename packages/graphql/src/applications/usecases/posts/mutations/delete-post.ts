import { database } from '@looks-to-me/package-database';
import { R } from '@praha/byethrow';
import { ErrorFactory } from '@praha/error-factory';
import { UnexpectedError } from '@praha/error-factory/presets';
import { eq } from 'drizzle-orm';

import type { Post } from '../types/post';

export type DeletePostInput = {
  userId: string;
  id: string;
};

export type DeletePostOutput = (
  | Post
);

export class DeletePostNotFoundError extends ErrorFactory({
  name: 'DeletePostNotFoundError',
  message: 'The post does not exist.',
}) {}

export class DeletePostForbiddenError extends ErrorFactory({
  name: 'DeletePostForbiddenError',
  message: 'You are not allowed to delete this post.',
}) {}

export type DeletePostError = (
  | DeletePostNotFoundError
  | DeletePostForbiddenError
  | UnexpectedError
);

export type DeletePost = (input: DeletePostInput) => R.ResultAsync<DeletePostOutput, DeletePostError>;

export const deletePost: DeletePost = (input) => {
  const findPost = (id: string) => R.pipe(
    R.try({
      try: () => {
        return database()
          .select({
            id: database.schema.posts.id,
            userId: database.schema.posts.userId,
            word: database.schema.posts.word,
          })
          .from(database.schema.posts)
          .where(eq(database.schema.posts.id, id))
          .get();
      },
      catch: (error) => new UnexpectedError({ cause: error }),
    }),
    R.andThen((row) => {
      if (row) return R.succeed(row);
      return R.fail(new DeletePostNotFoundError());
    }),
  );

  const authorize = (post: R.InferSuccess<typeof findPost>, userId: string) => {
    if (post.userId !== userId) {
      return R.fail(new DeletePostForbiddenError());
    }
    return R.succeed(post);
  };

  const deletePost = R.fn({
    try: (id: string) => {
      return database()
        .delete(database.schema.posts)
        .where(eq(database.schema.posts.id, id));
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  return R.pipe(
    R.do(),
    R.bind('post', () => findPost(input.id)),
    R.andThrough(({ post }) => authorize(post, input.userId)),
    R.andThrough(({ post }) => deletePost(post.id)),
    R.map(({ post }) => ({
      id: post.id,
      word: post.word,
    })),
  );
};
