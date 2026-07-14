import { database } from '@looks-to-me/package-database';
import { R } from '@praha/byethrow';
import { UnexpectedError } from '@praha/error-factory/presets';
import { eq } from 'drizzle-orm';

import type { Post } from '../types/post';

export type FindPostByIdInput = {
  id: string;
};

export type FindPostByIdOutput = (
  | Post
  | undefined
);

export type FindPostByIdError = (
  | UnexpectedError
);

export type FindPostById = (input: FindPostByIdInput) => R.ResultAsync<FindPostByIdOutput, FindPostByIdError>;

export const findPostById: FindPostById = (input) => {
  const query = R.fn({
    try: (input: FindPostByIdInput) => {
      return database()
        .select({
          id: database.schema.posts.id,
          word: database.schema.posts.word,
        })
        .from(database.schema.posts)
        .where(
          eq(database.schema.posts.id, input.id),
        )
        .get();
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  const convert = (post: R.InferSuccess<typeof query>): FindPostByIdOutput => {
    if (!post) return;

    return {
      id: post.id,
      word: post.word,
    };
  };

  return R.pipe(
    query(input),
    R.map(convert),
  );
};
