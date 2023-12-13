'use server';

import { parse } from 'valibot';

import { supabase } from './instance';
import { UserMetadataSchema } from '../type/user-metadata';

import type { UserMetadata } from '../type/user-metadata';

export const getUserMetadata = async (): Promise<UserMetadata | undefined> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  return parse(UserMetadataSchema, {
    ...user.app_metadata,
    ...user.user_metadata,
  });
};
