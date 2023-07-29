import { supabase } from './instance';
import { AuthUserSchema } from '../type/auth-user';

import type { AuthUser } from '../type/auth-user';

export const getAuthUser = async (): Promise<AuthUser | undefined> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  return AuthUserSchema.parse({
    id: user.id,
    accountName: user.user_metadata['user_name'],
    displayName: user.user_metadata['name'],
    avatarUrl: user.user_metadata['avatar_url'],
  });
};
