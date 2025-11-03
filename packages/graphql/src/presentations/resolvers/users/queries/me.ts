import { R } from '@praha/byethrow';
import { ErrorFactory } from '@praha/error-factory';

import { findUserById } from '../../../../applications/usecases/users/queries/find-user-by-id';
import { auth } from '../../../../contexts';
import { builder } from '../../../core/builder';
import { User } from '../types/user';

class MeQueryNotFoundUserError extends ErrorFactory({
  name: 'MeQueryNotFoundUserError',
  message: 'The authenticated user was not found.',
}) {}

builder.queryField('me', (t) => t.field({
  type: User,
  nullable: true,
  description: 'Get the current authenticated user',
  resolve: () => {
    return R.pipe(
      R.do(),
      R.bind('auth', () => R.succeed(auth())),
      R.andThen(({ auth }) => {
        if (!auth.userId) return R.succeed(null);
        return R.pipe(
          findUserById({ id: auth.userId }),
          R.andThen((user) => {
            if (user) return R.succeed(user);
            return R.fail(new MeQueryNotFoundUserError());
          }),
        );
      }),
      R.unwrap(),
    );
  },
}));
