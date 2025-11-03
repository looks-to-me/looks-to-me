import { database } from '@looks-to-me/package-database';
import { R } from '@praha/byethrow';
import { ErrorFactory } from '@praha/error-factory';
import { UnexpectedError } from '@praha/error-factory/presets';
import { eq } from 'drizzle-orm';

import type { User } from '../types/user';

export type MuteUserInput = {
  userId: string;
  targetUserId: string;
};

export type MuteUserOutput = (
  | User
);

export class MuteUserCannotMuteSelfError extends ErrorFactory({
  name: 'MuteUserCannotMuteSelfError',
  message: 'Can\'t mute yourself.',
}) {}

export class MuteUserNotFoundUserError extends ErrorFactory({
  name: 'MuteUserNotFoundUserError',
  message: 'The user does not exist.',
}) {}

export type MuteUserError = (
  | MuteUserCannotMuteSelfError
  | MuteUserNotFoundUserError
  | UnexpectedError
);

export type MuteUser = (input: MuteUserInput) => R.ResultAsync<MuteUserOutput, MuteUserError>;

export const muteUser: MuteUser = (input) => {
  const validate = (input: MuteUserInput) => {
    if (input.userId === input.targetUserId) {
      return R.fail(new MuteUserCannotMuteSelfError());
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
      return R.fail(new MuteUserNotFoundUserError());
    }),
  );

  const saveMuteUser = R.fn({
    try: (user: User, target: User) => {
      return database()
        .insert(database.schema.muteUsers)
        .values({
          userId: user.id,
          muteUserId: target.id,
        });
    },
    catch: (error) => new UnexpectedError({ cause: error }),
  });

  return R.pipe(
    R.do(),
    R.bind('input', () => validate(input)),
    R.bind('user', ({ input }) => findUser(input.userId)),
    R.bind('target', ({ input }) => findUser(input.targetUserId)),
    R.andThrough(({ user, target }) => saveMuteUser(user, target)),
    R.map(({ target }) => target),
  );
};
