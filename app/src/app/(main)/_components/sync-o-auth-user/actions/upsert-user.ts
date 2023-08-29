'use server';

import { createId } from '@paralleldrive/cuid2';
import { and, eq } from 'drizzle-orm';

import { UserMetadataSchema } from '../../../../_libs/auth/type/user-metadata';
import { db } from '../../../../_libs/db';
import { schema } from '../../../../_libs/db/schema';

import type { User } from '@supabase/auth-helpers-react';

export const upsertUser = async (user: User): Promise<void> => {
  const userMetadata = UserMetadataSchema.parse({
    ...user.app_metadata,
    ...user.user_metadata,
  });

  const userProvider = await db()
    .select()
    .from(schema.userProviders)
    .where(
      and(
        eq(schema.userProviders.type, userMetadata.provider),
        eq(schema.userProviders.sub, userMetadata.sub),
      ),
    )
    .get();

  // create user if not exists
  if (!userProvider) {
    // TODO: Make use of transaction or batch.
    // @see: https://github.com/drizzle-team/drizzle-orm/issues/758
    {
      const userId = createId();
      await db()
        .insert(schema.users)
        .values({
          id: userId,
          registeredAt: new Date(),
        })
        .run();

      await db()
        .insert(schema.userProviders)
        .values({
          userId: userId,
          type: userMetadata.provider,
          sub: userMetadata.sub,
        })
        .run();

      await db()
        .insert(schema.userProfiles)
        .values({
          userId: userId,
          name: userMetadata.user_name,
          displayName: userMetadata.name ?? null,
          avatarUrl: userMetadata.avatar_url,
        })
        .run();
    }

    return;
  }

  // upsert user profile
  await db()
    .insert(schema.userProfiles)
    .values({
      userId: userProvider.userId,
      name: userMetadata.user_name,
      displayName: userMetadata.name ?? null,
      avatarUrl: userMetadata.avatar_url,
    })
    .onConflictDoUpdate({
      target: schema.userProfiles.userId,
      set: {
        name: userMetadata.user_name,
        displayName: userMetadata.name ?? null,
        avatarUrl: userMetadata.avatar_url,
      },
    })
    .run();
};
