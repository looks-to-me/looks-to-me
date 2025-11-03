import { database } from '@looks-to-me/package-database';
import { R } from '@praha/byethrow';
import { UnexpectedError } from '@praha/error-factory/presets';
import { and, desc, eq, isNull, lt, ne, or } from 'drizzle-orm';

import type { Post } from '../types/post';

export type FindPostsByNewestInput = {
  userId: string | undefined;
  cursor: FindPostsByNewestCursor | undefined;
  limit: number;
};

export type FindPostsByNewestCursor = {
  id: string;
  postedAt: string;
};

export type FindPostsByNewestNode = Post & {
  cursor: FindPostsByNewestCursor;
};

export type FindPostsByNewestOutput = (
  | FindPostsByNewestNode[]
);

export type FindPostsByNewestError = (
  | UnexpectedError
);

export type FindPostsByNewest = (input: FindPostsByNewestInput) => R.ResultAsync<FindPostsByNewestOutput, FindPostsByNewestError>;

export const findPostsByNewest: FindPostsByNewest = (input) => {
  const query = R.fn({
    try: (input: FindPostsByNewestInput) => {
      return database()
        .select({
          id: database.schema.posts.id,
          word: database.schema.posts.word,
          postedAt: database.schema.posts.postedAt,
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
            input.cursor ? or(
              lt(database.schema.posts.postedAt, new Date(input.cursor.postedAt)),
              and(
                eq(database.schema.posts.postedAt, new Date(input.cursor.postedAt)),
                lt(database.schema.posts.id, input.cursor.id),
              ),
            ) : undefined,
          ),
        )
        .orderBy(
          desc(database.schema.posts.postedAt),
          desc(database.schema.posts.id),
        )
        .limit(input.limit)
        .all();
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  const convert = (posts: R.InferSuccess<typeof query>): FindPostsByNewestNode[] => {
    return posts.map((post) => ({
      id: post.id,
      word: post.word,
      cursor: {
        id: post.id,
        postedAt: post.postedAt.toISOString(),
      },
    }));
  };

  return R.pipe(
    query(input),
    R.map(convert),
  );
};
