import { database } from '@looks-to-me/package-database';
import { R } from '@praha/byethrow';
import { UnexpectedError } from '@praha/error-factory/presets';
import { and, eq, isNull, ne, or, sql } from 'drizzle-orm';

import type { Post } from '../types/post';

export type FindPostsByRandomInput = {
  userId: string | undefined;
  limit: number;
};

export type FindPostsByRandomCursor = {
  id: string;
};

export type FindPostsByRandomNode = Post & {
  cursor: FindPostsByRandomCursor;
};

export type FindPostsByRandomOutput = (
  | FindPostsByRandomNode[]
);

export type FindPostsByRandomError = (
  | UnexpectedError
);

export type FindPostsByRandom = (input: FindPostsByRandomInput) => R.ResultAsync<FindPostsByRandomOutput, FindPostsByRandomError>;

export const findPostsByRandom: FindPostsByRandom = (input) => {
  const query = R.fn({
    try: (input: FindPostsByRandomInput) => {
      return database()
        .select({
          id: database.schema.posts.id,
          word: database.schema.posts.word,
        })
        .from(database.schema.posts)
        .leftJoin(
          database.schema.muteUsers,
          eq(database.schema.muteUsers.muteUserId, database.schema.posts.userId),
        )
        .where(
          and(
            or(
              isNull(database.schema.muteUsers.userId),
              ne(database.schema.muteUsers.userId, input.userId ?? ''),
            ),
            sql`posts._ROWID_ >= IFNULL((ABS(RANDOM()) % ((SELECT (MAX(_ROWID_) - ${input.limit}) FROM posts))), 0)`,
          ),
        )
        .limit(input.limit)
        .all();
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  // Fisher–Yates shuffle
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const shuffle = <T extends object>(array: Array<T>): Array<T> => {
    return array.reduce((previous, current, index) => {
      const key = Math.floor(Math.random() * (index + 1));
      previous[index] = previous[key]!;
      previous[key] = current;
      return previous;
    }, [] as Array<T>);
  };

  const convert = (posts: R.InferSuccess<typeof query>): FindPostsByRandomNode[] => {
    return posts.map((post) => ({
      id: post.id,
      word: post.word,
      cursor: {
        id: post.id,
      },
    }));
  };

  return R.pipe(
    query(input),
    R.map(shuffle),
    R.map(convert),
  );
};
