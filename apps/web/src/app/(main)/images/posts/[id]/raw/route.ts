import { findPostById } from '../../../../../../repositories/post-repository';
import { privateEnv } from '../../../../../_libs/env';
import { storage } from '../../../../../_libs/storage';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

type Context = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, context: Context) => {
  // In the production environment, it should only be accessible by Workers.
  if (
    privateEnv().NODE_ENV === 'production'
    && request.headers.get('authorization') !== `Bearer ${privateEnv().INTERNAL_API_TOKEN}`
  ) {
    return new Response(null, { status: 403, statusText: 'Forbidden' });
  }

  const post = await findPostById(context.params.id);
  if (!post) return new Response(null, { status: 404, statusText: 'Not Found' });

  const image = await storage().get(`users/${post.userId}/images/${post.imageId}`);
  if (!image) return new Response(null, { status: 404, statusText: 'Not Found' });

  const headers = new Headers();
  image.writeHttpMetadata(headers);
  headers.set('etag', image.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000, immutable');

  return new Response(await image.blob() as unknown as Blob, {
    headers,
  });
};
