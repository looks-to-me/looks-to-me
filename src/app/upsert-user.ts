'use server';

import { eq } from 'drizzle-orm';

import { db } from './_libs/db';
import { users } from './_libs/db/schema/tables/users';

import type { AuthUser } from './_libs/auth/type/auth-user';

type UpsertUser = (authUser: AuthUser) => Promise<void>;
export const upsertUser: UpsertUser = async (authUser) => {
  const dbUser = await db().select().from(users).where(eq(users.id, authUser.id)).get();

  if (!dbUser) {
    await db()
      .insert(users)
      .values({
        id: authUser.id,
        name: authUser.accountName,
        displayName: authUser.displayName,
        avatarUrl: authUser.avatarUrl,
        registeredAt: new Date(),
      })
      .run();

    return;
  }

  if (
    dbUser.name !== authUser.accountName ||
    dbUser.displayName !== authUser.displayName ||
    dbUser.avatarUrl !== authUser.avatarUrl 
  ) {
    await db()
      .update(users)
      .set({
        name: authUser.accountName,
        displayName: authUser.displayName,
        avatarUrl: authUser.avatarUrl,
      })
      .where(eq(users.id, authUser.id))
      .run();
  }
};
