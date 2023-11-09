import { and, eq } from 'drizzle-orm';

import { database } from '../../_libs/database';
import { schema } from '../../_libs/database/schema';

export type UserProvider = {
  userId: string;
  type: string;
  sub: string;
};

export const insertUserProvider = async (userProvider: UserProvider): Promise<UserProvider> => {
  await database()
    .insert(schema.userProviders)
    .values(userProvider)
    .run();

  return userProvider;
};

export const findUserProviderByTypeAndSub = async (
  type: UserProvider['type'],
  sub: UserProvider['sub'],
): Promise<UserProvider | undefined> => {
  return await database()
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
