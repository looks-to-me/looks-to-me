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
