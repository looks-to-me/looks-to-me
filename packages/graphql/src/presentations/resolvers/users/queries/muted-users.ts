import { R } from '@praha/byethrow';

import { findMutedUsers } from '../../../../applications/usecases/users/queries/find-muted-users';
import { auth } from '../../../../contexts';
import { builder } from '../../../core/builder';
import { User } from '../types/user';

builder.queryField('mutedUsers', (t) => t.field({
  type: [User],
  description: 'Get muted users',
  resolve: async () => {
    return R.pipe(
      R.do(),
      R.bind('auth', () => R.succeed(auth())),
      R.andThen(({ auth }) => {
        if (!auth.userId) return R.succeed([]);
        return findMutedUsers({ userId: auth.userId });
      }),
      R.unwrap(),
    );
  },
}));
