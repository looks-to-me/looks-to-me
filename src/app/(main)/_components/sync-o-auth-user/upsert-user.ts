'use server';

import { db } from '../../../_libs/db';
import { users } from '../../../_libs/db/schema/tables/users';

import type { AuthUser } from '../../../_libs/auth/type/auth-user';

type UpsertUser = (authUser: AuthUser) => Promise<void>;
export const upsertUser: UpsertUser = async (authUser) => {
  await db()
    .insert(users)
    .values({
      id: authUser.id,
      name: authUser.accountName,
      displayName: authUser.displayName,
      avatarUrl: authUser.avatarUrl,
      registeredAt: new Date(),
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        name: authUser.accountName,
        displayName: authUser.displayName,
        avatarUrl: authUser.avatarUrl,
      },
    })
    .run();
};
