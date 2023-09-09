'use server';

import { createId } from '@paralleldrive/cuid2';
import { parse } from 'valibot';

import { UserMetadataSchema } from '../../../../_libs/auth/type/user-metadata';
import { findUserProviderByTypeAndSub, saveUserProvider } from '../../../_repositories/user-provider-repository';
import { saveUser } from '../../../_repositories/user-repository';

import type { User } from '@supabase/auth-helpers-react';

export const upsertUser = async (authUser: User): Promise<void> => {
  const userMetadata = parse(UserMetadataSchema, {
    ...authUser.app_metadata,
    ...authUser.user_metadata,
  });

  const userProvider = await findUserProviderByTypeAndSub(userMetadata.provider, userMetadata.sub);
  
  if (userProvider) {
    await saveUser({
      id: userProvider.userId,
      profile: {
        name: userMetadata.user_name,
        displayName: userMetadata.name ?? null,
        avatarUrl: userMetadata.avatar_url,
      },
    });
    return;
  }

  const user = await saveUser({
    id: createId(),
    profile: {
      name: userMetadata.user_name,
      displayName: userMetadata.name ?? null,
      avatarUrl: userMetadata.avatar_url,
    },
  });

  await saveUserProvider({
    userId: user.id,
    type: userMetadata.provider,
    sub: userMetadata.sub,
  });
};
