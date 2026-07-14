import { database } from '@looks-to-me/package-database';
import { R } from '@praha/byethrow';
import { ErrorFactory } from '@praha/error-factory';
import { UnexpectedError } from '@praha/error-factory/presets';
import { and, eq } from 'drizzle-orm';

import type { User } from '../types/user';

export type UnmuteUserInput = {
  userId: string;
  targetUserId: string;
};

export type UnmuteUserOutput = (
  | User
);

export class UnmuteUserCannotUnmuteSelfError extends ErrorFactory({
  name: 'UnmuteUserCannotUnmuteSelfError',
  message: 'Can\'t unmute yourself.',
}) {}

export class UnmuteUserNotFoundUserError extends ErrorFactory({
  name: 'UnmuteUserNotFoundUserError',
  message: 'The user does not exist.',
}) {}

export type UnmuteUserError = (
  | UnmuteUserCannotUnmuteSelfError
  | UnmuteUserNotFoundUserError
  | UnexpectedError
);

export type UnmuteUser = (input: UnmuteUserInput) => R.ResultAsync<UnmuteUserOutput, UnmuteUserError>;

export const unmuteUser: UnmuteUser = (input) => {
  const validate = (input: UnmuteUserInput) => {
    if (input.userId === input.targetUserId) {
      return R.fail(new UnmuteUserCannotUnmuteSelfError());
    }
    return R.succeed(input);
  };

  const findUser = (id: string) => R.pipe(
    R.try({
      try: () => {
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
          .where(eq(database.schema.users.id, id))
          .get();
      },
      catch: (error) => new UnexpectedError({ cause: error }),
    }),
    R.andThen((row) => {
      if (row) return R.succeed(row);
      return R.fail(new UnmuteUserNotFoundUserError());
    }),
  );

  const deleteUnmuteUser = R.fn({
    try: (user: User, target: User) => {
      return database()
        .delete(database.schema.muteUsers)
        .where(
          and(
            eq(database.schema.muteUsers.userId, user.id),
            eq(database.schema.muteUsers.muteUserId, target.id),
          ),
        );
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  return R.pipe(
    R.do(),
    R.bind('input', () => validate(input)),
    R.bind('user', ({ input }) => findUser(input.userId)),
    R.bind('target', ({ input }) => findUser(input.targetUserId)),
    R.andThrough(({ user, target }) => deleteUnmuteUser(user, target)),
    R.map(({ target }) => target),
  );
};
