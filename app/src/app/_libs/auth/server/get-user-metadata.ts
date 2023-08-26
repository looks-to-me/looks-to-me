import { supabase } from './instance';
import { UserMetadataSchema } from '../type/user-metadata';

import type { UserMetadata } from '../type/user-metadata';

export const getUserMetadata = async (): Promise<UserMetadata | undefined> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  return UserMetadataSchema.parse({
    ...user.app_metadata,
    ...user.user_metadata,
  });
};
