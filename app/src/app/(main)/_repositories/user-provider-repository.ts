import { and, eq } from 'drizzle-orm';

import { db } from '../../_libs/db';
import { schema } from '../../_libs/db/schema';

import type { UserEntity } from './user-repository';
import type { UserProvider } from '../../_libs/db/schema/tables/user-providers';

export type UserProviderEntity = {
  userId: UserEntity['id'];
  type: UserProvider['type'];
  sub: UserProvider['sub'];
};

export const insertUserProvider = async (userProvider: UserProviderEntity): Promise<UserProviderEntity> => {
  await db()
    .insert(schema.userProviders)
    .values(userProvider)
    .run();

  return userProvider;
};

export const findUserProviderByTypeAndSub = async (
  type: UserProvider['type'],
  sub: UserProvider['sub'],
): Promise<UserProviderEntity | undefined> => {
  return await db()
    .select()
    .from(schema.userProviders)
    .where(
      and(
        eq(schema.userProviders.type, type),
        eq(schema.userProviders.sub, sub),
      ),
    )
    .get();
};
