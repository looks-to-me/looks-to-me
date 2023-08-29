'use server';

import { eq } from 'drizzle-orm';

import { db } from '../../_libs/db';
import { schema } from '../../_libs/db/schema';

import type { UserProfile } from '../../_libs/db/schema/tables/user-profiles';
import type { User } from '../../_libs/db/schema/tables/users';

export type UserEntity = {
  id: User['id'];
  profile: {
    name: UserProfile['name'];
    displayName: UserProfile['displayName'];
    avatarUrl: UserProfile['avatarUrl'];
  };
};

export const insertUser = async (user: UserEntity): Promise<UserEntity> => {
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

export const updateUser = async (user: UserEntity): Promise<UserEntity> => {
  await db()
    .update(schema.userProfiles)
    .set(user.profile)
    .where(eq(schema.userProfiles.userId, user.id))
    .run();

  return user;
};

export const findUserById = async (id: UserEntity['id']): Promise<UserEntity | undefined> => {
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
