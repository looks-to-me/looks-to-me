import { env } from '../../../../_libs/env';
import { findImageById } from '../../../_repositories/image-repository';
import { findPostById } from '../../../_repositories/post-repository';
import { imageCache } from '../../_helpers/image-cache';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const fetchImage = async (request: Request, id: string): Promise<Response> => {
  const url = new URL(request.url);

  const post = await findPostById(id);
  if (!post) return Response.error();
  
  const image = await findImageById(post.imageId);
  if (!image) return Response.error();

  const origin = `${url.origin}/images/posts/${post.id}/raw`;
  if (env().NODE_ENV === 'development') {
    return fetch(origin);
  }

  const fetchUrl = new URL(env().IMAGE_OVERLAY_WORKER_URL);
  fetchUrl.searchParams.set('origin', origin);
  fetchUrl.searchParams.set('overlay', `${url.origin}/images/overlays/${post.word}`);

  // Make the image equal to the width of the overlay without changing the aspect ratio.
  const ratio = image.width / image.height;
  fetchUrl.searchParams.set('width', '1200');
  fetchUrl.searchParams.set('height', (1200 / ratio).toString());

  const accept = request.headers.get('accept');
  return await fetch(fetchUrl, {
    headers: {
      ...(accept ? { accept } : {}),
      authorization: `Bearer ${env().INTERNAL_API_TOKEN}`,
    },
  });
};

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const post = await findPostById(params.id);
  if (!post) return Response.error();

  const accept = request.headers.get('accept');
  const format = accept?.includes('image/avif') ? 'avif' : accept?.includes('image/webp') ? 'webp' : 'unknown';
  
  return imageCache({
    url: request.url,
    format: format,
  }, async () => {
    const response = await fetchImage(request, params.id);

    // Exclude Cloudflare-related headers so that Cloudflare does not mis-detect them as loop backs.
    const headers: Record<string, string> = { 'cache-control': 'public, max-age=31536000, immutable' };
    response.headers.forEach((value, key) => {
      if (key.startsWith('cf-')) return;
      headers[key] = value;
    });

    return new Response(await response.blob(), {
      headers,
    });
  });
};
