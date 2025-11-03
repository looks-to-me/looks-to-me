import { database } from '@looks-to-me/package-database';
import { R } from '@praha/byethrow';
import { UnexpectedError } from '@praha/error-factory/presets';
import { eq } from 'drizzle-orm';

import type { User } from '../../users/types/user';

export type FindAuthorByPostIdInput = {
  postId: string;
};

export type FindAuthorByPostIdOutput = (
  | User
  | undefined
);

export type FindAuthorByPostIdError = (
  | UnexpectedError
);

export type FindAuthorByPostId = (input: FindAuthorByPostIdInput) => R.ResultAsync<FindAuthorByPostIdOutput, FindAuthorByPostIdError>;

export const findAuthorByPostId: FindAuthorByPostId = (input) => {
  const query = R.fn({
    try: (input: FindAuthorByPostIdInput) => {
      return database()
        .select({
          id: database.schema.users.id,
          name: database.schema.userProfiles.name,
          displayName: database.schema.userProfiles.displayName,
          avatarUrl: database.schema.userProfiles.avatarUrl,
        })
        .from(database.schema.users)
        .innerJoin(
          database.schema.userProfiles,
          eq(database.schema.userProfiles.userId, database.schema.users.id),
        )
        .innerJoin(
          database.schema.posts,
          eq(database.schema.posts.userId, database.schema.users.id),
        )
        .where(
          eq(database.schema.posts.id, input.postId),
        )
        .get();
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  const convert = (user: R.InferSuccess<typeof query>): FindAuthorByPostIdOutput => {
    if (!user) return;

    return {
      id: user.id,
      name: user.name,
      displayName: user.displayName,
    };
  };

  return R.pipe(
    query(input),
    R.map(convert),
  );
};
