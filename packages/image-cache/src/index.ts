import { fetchR2Cache, getCacheKey, getCaches, getR2CacheKey } from './helper';

import type { Response as WorkerResponse } from '@cloudflare/workers-types';

export type ImageCacheParameters = {
  request: Request;
  format?: 'webp' | 'png' | undefined;
  width?: number | undefined;
  bucket: R2Bucket;
  waitUntil?: ExecutionContext['waitUntil'];
};

export const imageCache = async (
  {
    request,
    format,
    width,
    bucket,
    waitUntil,
  }: ImageCacheParameters,
  callback: () => Promise<Response>,
): Promise<WorkerResponse> => {
  const caches = getCaches();
  const cacheKey = getCacheKey(request);
  const cacheResponse = await caches?.default?.match(cacheKey);
  if (cacheResponse) return cacheResponse;

  const wait = async (promise: Promise<unknown>) => {
    if (waitUntil) {
      waitUntil(promise);
    } else {
      await promise;
    }
  };

  const r2CacheKey = getR2CacheKey({
    path: new URL(request.url).pathname,
    format,
    width,
  });

  const r2Cache = await fetchR2Cache(bucket, r2CacheKey);
  if (r2Cache) {
    if (caches) {
      await wait(caches.default.put(cacheKey, r2Cache.clone()));
    }
    return r2Cache;
  }

  const callbackResponse = await callback();
  const buffer = await callbackResponse.arrayBuffer();
  const headers = new Headers(callbackResponse.headers);
  const needsCache = callbackResponse.ok && (headers.get('content-type')?.startsWith('image/') ?? false);
  if (needsCache) headers.set('cache-control', 'public, max-age=31536000, immutable');

  const response = new Response(buffer, {
    headers,
    status: callbackResponse.status,
    statusText: callbackResponse.statusText,
  }) as unknown as WorkerResponse;

  if (needsCache) {
    if (caches) {
      await wait(caches.default.put(cacheKey, response.clone()));
    }
    await wait(bucket.put(r2CacheKey, buffer));
  }

  return response;
};
