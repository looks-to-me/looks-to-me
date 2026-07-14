/* eslint-disable @typescript-eslint/no-unsafe-return */

import { database } from '@looks-to-me/package-database';
import { withAuth } from '@looks-to-me/package-graphql';
import { and, eq } from 'drizzle-orm';

import { getUserMetadata } from '../../../app/_libs/auth/server/get-user-metadata';

import type { Plugin } from '@envelop/core';
import type { Auth } from '@looks-to-me/package-graphql';

const createAuth = async (): Promise<Auth> => {
  const userMetadata = await getUserMetadata();
  if (!userMetadata) return { userId: undefined };

  const user = await database()
    .select({ id: database.schema.users.id })
    .from(database.schema.users)
    .innerJoin(
      database.schema.userProviders,
      eq(database.schema.userProviders.userId, database.schema.users.id),
    )
    .where(
      and(
        eq(database.schema.userProviders.type, userMetadata.provider),
        eq(database.schema.userProviders.sub, userMetadata.sub),
      ),
    )
    .get();

  if (!user) return { userId: undefined };
  return { userId: user?.id };
};

export const useAuth = (): Plugin => ({
  onExecute: ({ executeFn, setExecuteFn }) => {
    setExecuteFn(async (arguments_) => {
      const context: Auth = await createAuth();

      return withAuth(context, async () => {
        return await executeFn(arguments_);
      });
    });
  },
});
