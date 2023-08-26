import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';

import { db } from '../../../../../_libs/db';
import { schema } from '../../../../../_libs/db/schema';
import { env } from '../../../../../_libs/env';
import { storage } from '../../../../../_libs/storage';

import type { Headers as WorkerHeaders } from '@cloudflare/workers-types';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  // In the production environment, it should only be accessible by Workers.
  if (env().NODE_ENV === 'production') {
    if (request.headers.get('authorization') !== `Bearer ${env().INTERNAL_API_TOKEN}`) {
      return Response.error();
    }
  }

  const post = await db()
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.id, params.id))
    .get();
  if (!post) return Response.error();

  const image = await storage().get(`users/${post.userId}/images/${post.imageId}`);
  if (!image) return Response.error();

  const headers = new Headers();
  image.writeHttpMetadata(headers as unknown as WorkerHeaders);
  headers.set('etag', image.httpEtag);

  return new NextResponse(await image.blob() as unknown as Blob, {
    headers,
  });
};
