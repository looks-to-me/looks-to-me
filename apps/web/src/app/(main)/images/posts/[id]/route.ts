import { createDatabase, database, withDatabase } from '@looks-to-me/package-database';
import { tieredCache } from '@looks-to-me/package-tiered-cache';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { eq } from 'drizzle-orm';

import { privateEnv } from '../../../../_libs/env';
import { storage } from '../../../../_libs/storage';

import type { NextRequest } from 'next/server';

type Context = RouteContext<'/images/posts/[id]'>;

export const GET = async (request: NextRequest, context: Context) => {
  const { id } = await context.params;
  const { ctx, env } = getCloudflareContext();
  const cache = tieredCache({
    bucket: env.TIERED_CACHE,
    waitUntil: ctx.waitUntil.bind(ctx),
  });

  return withDatabase(createDatabase(privateEnv().DB), async () => {
    const post = await database()
      .select({
        userId: database.schema.posts.userId,
        imageId: database.schema.posts.imageId,
        word: database.schema.posts.word,
      })
      .from(database.schema.posts)
      .innerJoin(
        database.schema.images,
        eq(database.schema.images.id, database.schema.posts.imageId),
      )
      .where(
        eq(database.schema.posts.id, id),
      )
      .get();

    if (!post) return new Response(null, { status: 404, statusText: 'Not Found' });
    const source = await storage().get(`users/${post.userId}/images/${post.imageId}`);
    if (!source) return new Response(null, { status: 404, statusText: 'Not Found' });

    const url = new URL(request.url);
    return cache(url, async () => {
      return await privateEnv().OVERLAY.fetch(`${url.origin}/${post.word}`, { method: 'POST', body: source.body });
    });
  });
};
