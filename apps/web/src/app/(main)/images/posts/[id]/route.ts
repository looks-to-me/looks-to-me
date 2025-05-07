import { imageCache } from '@looks-to-me/package-image-cache';
import { getImageMetadata } from '@looks-to-me/package-image-metadata';

import { findImageById } from '../../../../../repositories/image-repository';
import { findPostById } from '../../../../../repositories/post-repository';
import { privateEnv } from '../../../../_libs/env';
import { storage } from '../../../../_libs/storage';

import type { ImageCacheParameters } from '@looks-to-me/package-image-cache';
import type { NextRequest } from 'next/server';

const fetchImage = async (request: Request, id: string): Promise<Response> => {
  const post = await findPostById(id);
  if (!post) return new Response(null, { status: 404, statusText: 'Not Found' });

  const image = await findImageById(post.imageId);
  if (!image) return new Response(null, { status: 404, statusText: 'Not Found' });

  const source = await storage().get(`users/${post.userId}/images/${post.imageId}`);
  if (!source) return new Response(null, { status: 404, statusText: 'Not Found' });

  const url = new URL(request.url);
  const overlay = await fetch(`${url.origin}/images/overlays/${post.word}`);
  if (!overlay.body) return new Response(null, { status: 404, statusText: 'Not Found' });

  const [transformStream, metadataStream] = (source.body as ReadableStream<Uint8Array>).tee();
  const ratio = image.width / image.height;
  const transform = { fit: 'contain', width: 600, height: (600 / ratio) } satisfies ImageTransform;
  const metadata = await getImageMetadata(metadataStream);
  const format = request.headers.get('accept')?.includes('image/webp')
    ? 'image/webp'
    : (metadata?.animated ? 'image/gif' : 'image/jpeg');

  const output = await privateEnv().IMAGES
    .input(transformStream)
    .transform(transform)
    .draw(privateEnv().IMAGES.input(overlay.body).transform(transform))
    .output({ format });

  return output.response();
};

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = async (request: NextRequest, context: Context) => {
  const { id } = await context.params;
  const post = await findPostById(id);
  if (!post) return new Response(null, { status: 404, statusText: 'Not Found' });

  const parameters: ImageCacheParameters = {
    request,
    format: request.headers.get('accept')?.includes('image/webp') ? 'webp' : undefined,
    bucket: privateEnv().BUCKET,
  };

  return imageCache(parameters, async () => {
    const response = await fetchImage(request, id);

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
