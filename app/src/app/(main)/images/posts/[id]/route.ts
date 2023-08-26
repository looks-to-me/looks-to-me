import { eq } from 'drizzle-orm';

import { getImageSize } from './_helpers/image-size';
import { db } from '../../../../_libs/db';
import { schema } from '../../../../_libs/db/schema';
import { env } from '../../../../_libs/env';

import type { ImageSize } from './_helpers/image-size';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const fetchImageSize = async (origin: string): Promise<ImageSize> => {
  const response = await fetch(origin, {
    headers: {
      authorization: `Bearer ${env().INTERNAL_API_TOKEN}`,
    },
  });

  const buffer = await response.arrayBuffer();
  return getImageSize(new Uint8Array(buffer));
};

const fetchImage = async (origin: string, overlay: string): Promise<Response> => {
  if (env().NODE_ENV === 'development') {
    return fetch(origin);
  }

  const url = new URL(env().IMAGE_OVERLAY_WORKER_URL);
  url.searchParams.set('origin', origin);
  url.searchParams.set('overlay', overlay);

  const size = await fetchImageSize(origin);
  url.searchParams.set('width', size.width.toString());
  url.searchParams.set('height', size.height.toString());

  return await fetch(url, {
    headers: {
      authorization: `Bearer ${env().INTERNAL_API_TOKEN}`,
    },
  });
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
    `${url.origin}/images/posts/${post.id}/raw`,
    `${url.origin}/images/overlays/${post.word}`,
  );

  return new Response(await response.blob(), {
    headers: response.headers,
  });
};
