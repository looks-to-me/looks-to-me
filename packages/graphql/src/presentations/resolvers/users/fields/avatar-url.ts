import { env } from '../../../../contexts';
import { builder } from '../../../core/builder';
import { User } from '../types/user';

builder.objectField(User, 'avatarUrl', (t) => t.field({
  type: 'String',
  description: 'The URL of the user avatar',
  resolve: (user) => {
    return `${env().APP_ORIGIN}/images/avatars/${user.id}`;
  },
}));
