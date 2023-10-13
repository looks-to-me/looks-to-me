import { and, eq } from 'drizzle-orm';

import { db } from '../../_libs/db';
import { schema } from '../../_libs/db/schema';

export type UserProvider = {
  userId: string;
  type: string;
  sub: string;
};

export const insertUserProvider = async (userProvider: UserProvider): Promise<UserProvider> => {
  await db()
    .insert(schema.userProviders)
    .values(userProvider)
    .run();

  return userProvider;
};

export const findUserProviderByTypeAndSub = async (
  type: UserProvider['type'],
  sub: UserProvider['sub'],
): Promise<UserProvider | undefined> => {
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
