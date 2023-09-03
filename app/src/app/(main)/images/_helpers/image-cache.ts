import { env } from '../../../_libs/env';

import type { Headers as WorkerHeaders } from '@cloudflare/workers-types';

export type CacheKeyParams = {
  url: string;
  format: string;
  width?: number;
  height?: number;
};

const cacheKey = (params: CacheKeyParams): string => {
  const size = [
    params.width,
    params.height,
  ].filter(Boolean);

  const key = `caches/${encodeURIComponent(params.url)}/${params.format}`;
  if (size.length <= 0) return key;

  return `${key}/${size.join('x')}`;
};

export const imageCache = async (keyParams: CacheKeyParams, callback: () => Promise<Response>): Promise<Response> => {
  const key = cacheKey(keyParams);
  const cache = await env().BUCKET.get(key);
  if (cache) {
    const headers = new Headers();
    cache.writeHttpMetadata(headers as unknown as WorkerHeaders);
    headers.set('etag', cache.httpEtag);
    headers.set('cache-control', 'public, max-age=31536000, immutable');
    return new Response(await cache.arrayBuffer(), { headers });
  }

  const response = await callback();
  const buffer = await response.arrayBuffer();

  if (response.ok) {
    await env().BUCKET.put(key, buffer);
  }

  return new Response(buffer, { headers: response.headers });
};
