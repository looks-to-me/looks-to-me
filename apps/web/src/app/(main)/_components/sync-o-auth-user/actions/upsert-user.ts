'use server';

import { createId } from '@paralleldrive/cuid2';
import { parse } from 'valibot';

import { UserMetadataSchema } from '../../../../_libs/auth/type/user-metadata';
import { findUserProviderByTypeAndSub, insertUserProvider } from '../../../_repositories/user-provider-repository';
import { insertUser, updateUser } from '../../../_repositories/user-repository';

import type { User } from '@supabase/auth-helpers-react';

export const upsertUser = async (authUser: User): Promise<void> => {
  const userMetadata = parse(UserMetadataSchema, {
    ...authUser.app_metadata,
    ...authUser.user_metadata,
  });

  const userProvider = await findUserProviderByTypeAndSub(userMetadata.provider, userMetadata.sub);
  
  if (userProvider) {
    await updateUser({
      id: userProvider.userId,
      profile: {
        name: userMetadata.user_name,
        displayName: userMetadata.name ?? null,
        avatarUrl: userMetadata.avatar_url,
      },
    });
    return;
  }

  const user = await insertUser({
    id: createId(),
    profile: {
      name: userMetadata.user_name,
      displayName: userMetadata.name ?? null,
      avatarUrl: userMetadata.avatar_url,
    },
  });

  await insertUserProvider({
    userId: user.id,
    type: userMetadata.provider,
    sub: userMetadata.sub,
  });
};
