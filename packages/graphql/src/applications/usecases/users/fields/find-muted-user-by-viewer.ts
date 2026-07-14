import { database } from '@looks-to-me/package-database';
import { R } from '@praha/byethrow';
import { UnexpectedError } from '@praha/error-factory/presets';
import { and, eq } from 'drizzle-orm';

import type { User } from '../types/user';

export type FindMutedUserByViewerInput = {
  userId: string;
  targetUserId: string;
};

export type FindMutedUserByViewerOutput = (
  | User
  | undefined
);

export type FindMutedUserByViewerError = (
  | UnexpectedError
);

export type FindMutedUserByViewer = (input: FindMutedUserByViewerInput) => R.ResultAsync<FindMutedUserByViewerOutput, FindMutedUserByViewerError>;

export const findMutedUserByViewer: FindMutedUserByViewer = (input) => {
  const query = R.fn({
    try: (input: FindMutedUserByViewerInput) => {
      return database()
        .select({
          id: database.schema.users.id,
          name: database.schema.userProfiles.name,
          displayName: database.schema.userProfiles.displayName,
        })
        .from(database.schema.muteUsers)
        .innerJoin(
          database.schema.users,
          eq(database.schema.users.id, database.schema.muteUsers.muteUserId),
        )
        .innerJoin(
          database.schema.userProfiles,
          eq(database.schema.userProfiles.userId, database.schema.users.id),
        )
        .where(
          and(
            eq(database.schema.muteUsers.userId, input.userId),
            eq(database.schema.muteUsers.muteUserId, input.targetUserId),
          ),
        )
        .get();
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  const convert = (user: R.InferSuccess<typeof query>): FindMutedUserByViewerOutput => {
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
