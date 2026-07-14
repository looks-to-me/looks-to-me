import { createDatabase, database, withDatabase } from '@looks-to-me/package-database';
import { eq } from 'drizzle-orm';

import { privateEnv } from '../../../../_libs/env';

import type { NextRequest } from 'next/server';

type Context = RouteContext<'/images/avatars/[id]'>;

export const GET = async (_: NextRequest, context: Context) => {
  return withDatabase(createDatabase(privateEnv().DB), async () => {
    const { id } = await context.params;

    const user = await database()
      .select({
        avatarUrl: database.schema.userProfiles.avatarUrl,
      })
      .from(database.schema.users)
      .innerJoin(
        database.schema.userProfiles,
        eq(database.schema.users.id, database.schema.userProfiles.userId),
      )
      .where(
        eq(database.schema.users.id, id),
      )
      .get();

    if (!user) return new Response(null, { status: 404, statusText: 'Not Found' });
    return await fetch(user.avatarUrl);
  });
};
