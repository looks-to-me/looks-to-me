import { NextResponse } from 'next/dist/server/web/spec-extension/response';

import { env } from '../../../../../_libs/env';
import { storage } from '../../../../../_libs/storage';
import { findPostById } from '../../../../_repositories/post-repository';

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

  const post = await findPostById(params.id);
  if (!post) return Response.error();

  const image = await storage().get(`users/${post.userId}/images/${post.imageId}`);
  if (!image) return Response.error();

  const headers = new Headers();
  image.writeHttpMetadata(headers as unknown as WorkerHeaders);
  headers.set('etag', image.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000, immutable');

  return new NextResponse(await image.blob() as unknown as Blob, {
    headers,
  });
};
