'use server';

import { createId } from '@paralleldrive/cuid2';
import { parse } from 'valibot';

import { findUserProviderByTypeAndSub, saveUserProvider } from '../../../../../repositories/user-provider-repository';
import { saveUser } from '../../../../../repositories/user-repository';
import { UserMetadataSchema } from '../../../../_libs/auth/type/user-metadata';

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
