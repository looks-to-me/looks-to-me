'use server';

import { eq } from 'drizzle-orm';

import { db } from '../../_libs/db';
import { schema } from '../../_libs/db/schema';

export type User = {
  id: string;
  profile: {
    name: string;
    displayName: string | null;
    avatarUrl: string;
  };
};

export const insertUser = async (user: User): Promise<User> => {
  // TODO: Make use of transaction or batch.
  // @see: https://github.com/drizzle-team/drizzle-orm/issues/758
  {
    await db()
      .insert(schema.users)
      .values({
        id: user.id,
        registeredAt: new Date(),
      })
      .run();

    await db()
      .insert(schema.userProfiles)
      .values({
        ...user.profile,
        userId: user.id,
      });
  }

  return user;
};

export const updateUser = async (user: User): Promise<User> => {
  await db()
    .update(schema.userProfiles)
    .set(user.profile)
    .where(eq(schema.userProfiles.userId, user.id))
    .run();

  return user;
};

export const findUserById = async (id: User['id']): Promise<User | undefined> => {
  return await db()
    .select({
      id: schema.users.id,
      profile: {
        name: schema.userProfiles.name,
        displayName: schema.userProfiles.displayName,
        avatarUrl: schema.userProfiles.avatarUrl,
      },
    })
    .from(schema.users)
    .innerJoin(schema.userProfiles, eq(schema.users.id, schema.userProfiles.userId))
    .where(eq(schema.users.id, id))
    .get();
};
