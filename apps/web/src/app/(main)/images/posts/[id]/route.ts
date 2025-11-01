import { tieredCache } from '@looks-to-me/package-tiered-cache';
import { getCloudflareContext } from '@opennextjs/cloudflare';

import { findImageById } from '../../../../../repositories/image-repository';
import { findPostById } from '../../../../../repositories/post-repository';
import { privateEnv } from '../../../../_libs/env';
import { storage } from '../../../../_libs/storage';

import type { NextRequest } from 'next/server';

type Context = RouteContext<'/images/posts/[id]'>;

export const GET = async (request: NextRequest, context: Context) => {
  const { id } = await context.params;
  const post = await findPostById(id);
  if (!post) return new Response(null, { status: 404, statusText: 'Not Found' });

  const image = await findImageById(post.imageId);
  if (!image) return new Response(null, { status: 404, statusText: 'Not Found' });

  const source = await storage().get(`users/${post.userId}/images/${post.imageId}`);
  if (!source) return new Response(null, { status: 404, statusText: 'Not Found' });

  const url = new URL(request.url);
  const { ctx, env } = getCloudflareContext();
  const cache = tieredCache({
    bucket: env.TIERED_CACHE,
    waitUntil: ctx.waitUntil.bind(ctx),
  });

  return cache(url, async () => {
    return await privateEnv().OVERLAY.fetch(`${url.origin}/${post.word}`, { method: 'POST', body: source.body });
  });
};
