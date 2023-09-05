import type { Headers as WorkerHeaders, R2Bucket } from '@cloudflare/workers-types';

export type CacheKeyParams = {
  path: string;
  format?: 'webp' | 'png' | undefined;
  width?: number | undefined;
};

const cacheKey = (params: CacheKeyParams): string => {
  const path = params.path.replace(/^\/|\/$/g, '');
  const key = `caches/${path}/${params.format ?? 'unknown'}`;
  if (params.width) return `${key}/${params.width}`;
  return key;
};

export const imageCache = async (bucket: R2Bucket, params: CacheKeyParams, callback: () => Promise<Response>) => {
  const key = cacheKey(params);
  const cache = await bucket.get(key);

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
    if (response.headers.get('content-type')?.startsWith('image/')) {
      await bucket.put(key, buffer);
    }
  }

  return new Response(buffer, response);
};
