'use server';

import * as v from 'valibot';

import { createClient } from './instance';
import { UserMetadataSchema } from '../type/user-metadata';

import type { UserMetadata } from '../type/user-metadata';

export const getUserMetadata = async (): Promise<UserMetadata | undefined> => {
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) return;
  return v.parse(UserMetadataSchema, {
    ...user.app_metadata,
    ...user.user_metadata,
  });
};
