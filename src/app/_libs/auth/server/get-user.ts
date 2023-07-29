import { supabase } from './instance';
import { UserSchema } from '../type/user';

import type { User } from '../type/user';

export const getUser = async (): Promise<User | undefined> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  return UserSchema.parse({
    id: user.id,
    accountName: user.user_metadata['user_name'],
    displayName: user.user_metadata['name'],
    avatarUrl: user.user_metadata['avatar_url'],
  });
};
