import { eq } from 'drizzle-orm';

import { db } from '../../../../_libs/db';
import { schema } from '../../../../_libs/db/schema';
import { env } from '../../../../_libs/env';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const fetchImage = async (request: NextRequest, origin: string, overlay: string): Promise<Response> => {
  if (env().NODE_ENV === 'development') {
    return fetch(origin);
  }

  const url = new URL(request.url);
  url.searchParams.set('origin', origin);
  url.searchParams.set('overlay', overlay);

  return await env().IMAGE_OVERLAY.fetch(url) as unknown as Response;
};

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const post = await db()
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.id, params.id))
    .get();
  if (!post) return Response.error();

  const url = new URL(request.url);
  const response = await fetchImage(
    request,
    `${url.origin}/images/posts/${post.id}/raw`,
    `${url.origin}/images/overlays/${post.word}`,
  );

  return new Response(await response.blob(), {
    headers: response.headers,
  });
};
