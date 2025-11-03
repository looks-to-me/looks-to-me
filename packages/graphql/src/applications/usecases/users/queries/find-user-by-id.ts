import { database } from '@looks-to-me/package-database';
import { R } from '@praha/byethrow';
import { UnexpectedError } from '@praha/error-factory/presets';
import { eq } from 'drizzle-orm';

import type { User } from '../types/user';

export type FindUserByIdInput = {
  id: string;
};

export type FindUserByIdOutput = (
  | User
  | undefined
);

export type FindUserByIdError = (
  | UnexpectedError
);

export type FindUserById = (input: FindUserByIdInput) => R.ResultAsync<FindUserByIdOutput, FindUserByIdError>;

export const findUserById: FindUserById = (input) => {
  const query = R.fn({
    try: (input: FindUserByIdInput) => {
      return database()
        .select({
          id: database.schema.users.id,
          name: database.schema.userProfiles.name,
          displayName: database.schema.userProfiles.displayName,
        })
        .from(database.schema.users)
        .innerJoin(
          database.schema.userProfiles,
          eq(database.schema.userProfiles.userId, database.schema.users.id),
        )
        .where(
          eq(database.schema.users.id, input.id),
        )
        .get();
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  const convert = (user: R.InferSuccess<typeof query>): FindUserByIdOutput => {
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
