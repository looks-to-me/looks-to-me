import { imageCache } from '@looks-to-me/package-image-cache';

import { privateEnv } from '../../../../_libs/env';
import { findImageById } from '../../../_repositories/image-repository';
import { findPostById } from '../../../_repositories/post-repository';

import type { ImageCacheParameters } from '@looks-to-me/package-image-cache';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const fetchImage = async (request: Request, id: string): Promise<Response> => {
  const url = new URL(request.url);

  const post = await findPostById(id);
  if (!post) return Response.error();
  
  const image = await findImageById(post.imageId);
  if (!image) return Response.error();

  const origin = `${url.origin}/images/posts/${post.id}/raw`;
  if (privateEnv().NODE_ENV === 'development') {
    return fetch(origin);
  }

  const fetchUrl = new URL(privateEnv().IMAGE_OVERLAY_WORKER_URL);
  fetchUrl.searchParams.set('origin', origin);
  fetchUrl.searchParams.set('overlay', `${url.origin}/images/overlays/${post.word}`);

  // Make the image equal to the width of the overlay without changing the aspect ratio.
  const ratio = image.width / image.height;
  fetchUrl.searchParams.set('width', '600');
  fetchUrl.searchParams.set('height', (600 / ratio).toString());

  const accept = request.headers.get('accept');
  return await fetch(fetchUrl, {
    headers: {
      ...(accept ? { accept } : {}),
      authorization: `Bearer ${privateEnv().INTERNAL_API_TOKEN}`,
    },
  });
};

type Context = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, context: Context) => {
  const post = await findPostById(context.params.id);
  if (!post) return Response.error();

  const parameters: ImageCacheParameters = {
    request,
    format: request.headers.get('accept')?.includes('image/webp') ? 'webp' : undefined,
    bucket: privateEnv().BUCKET,
  };

  return imageCache(parameters, async () => {
    const response = await fetchImage(request, context.params.id);

    // Exclude Cloudflare-related headers so that Cloudflare does not mis-detect them as loop backs.
    const headers = new Headers(response.headers);
    headers.forEach((_value, key) => {
      if (key.startsWith('cf-')) {
        headers.delete(key);
      }
    });

    return new Response(await response.blob(), {
      headers,
      status: response.status,
      statusText: response.statusText,
    });
  });
};
