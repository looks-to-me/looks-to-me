import { database } from '@looks-to-me/package-database';
import { R } from '@praha/byethrow';
import { UnexpectedError } from '@praha/error-factory/presets';
import { eq } from 'drizzle-orm';

import type { User } from '../types/user';

export type FindMutedUsersInput = {
  userId: string;
};

export type FindMutedUsersOutput = (
  | User[]
);

export type FindMutedUsersError = (
  | UnexpectedError
);

export type FindMutedUsers = (input: FindMutedUsersInput) => R.ResultAsync<FindMutedUsersOutput, FindMutedUsersError>;

export const findMutedUsers: FindMutedUsers = (input) => {
  const query = R.fn({
    try: (input: FindMutedUsersInput) => {
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
          eq(database.schema.muteUsers.userId, input.userId),
        )
        .all();
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  const convert = (users: R.InferSuccess<typeof query>): FindMutedUsersOutput => {
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      displayName: user.displayName,
    }));
  };

  return R.pipe(
    query(input),
    R.map(convert),
  );
};
