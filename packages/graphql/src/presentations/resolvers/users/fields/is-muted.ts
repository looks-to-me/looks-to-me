import { R } from '@praha/byethrow';

import { findMutedUserByViewer } from '../../../../applications/usecases/users/fields/find-muted-user-by-viewer';
import { auth } from '../../../../contexts';
import { builder } from '../../../core/builder';
import { User } from '../types/user';

builder.objectField(User, 'isMuted', (t) => t.field({
  type: 'Boolean',
  description: 'Whether the viewer has muted this user',
  resolve: async (user) => {
    return R.pipe(
      R.do(),
      R.bind('auth', () => R.succeed(auth())),
      R.andThen(({ auth }) => {
        if (!auth.userId) return R.succeed(undefined);
        return findMutedUserByViewer({ userId: auth.userId, targetUserId: user.id });
      }),
      R.map((mutedUser) => mutedUser !== undefined),
      R.unwrap(),
    );
  },
}));
