import type {
  CacheStorage as WorkerCacheStorage,
  Request as WorkerRequest,
  Response as WorkerResponse,
} from '@cloudflare/workers-types';

const getCaches = (): WorkerCacheStorage | undefined => {
  if (typeof caches === 'undefined') return undefined;
  return caches as unknown as WorkerCacheStorage;
};

const getCacheKey = (request: Request): WorkerRequest => {
  return new Request(request.url.toString(), request) as unknown as WorkerRequest;
};

type R2CacheKeyParameters = {
  path: string;
  format?: 'webp' | 'png' | undefined;
  width?: number | undefined;
};

const getR2CacheKey = (parameters: R2CacheKeyParameters): string => {
  const path = parameters.path.replaceAll(/^\/|\/$/, '');
  const key = `caches/${path}/${parameters.format ?? 'unknown'}`;
  if (parameters.width) return `${key}/${parameters.width}`;
  return key;
};

const fetchR2Cache = async (bucket: R2Bucket, key: string): Promise<WorkerResponse | undefined> => {
  const r2ObjectBody = await bucket.get(key);
  if (!r2ObjectBody) return undefined;

  const headers = new Headers();
  r2ObjectBody.writeHttpMetadata(headers);
  headers.set('etag', r2ObjectBody.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000, immutable');
  return new Response(await r2ObjectBody.arrayBuffer(), { headers }) as unknown as WorkerResponse;
};

export type ImageCacheParameters = {
  request: Request;
  format?: 'webp' | 'png' | undefined;
  width?: number | undefined;
  bucket: R2Bucket;
  waitUntil: ExecutionContext['waitUntil'];
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

  const r2CacheKey = getR2CacheKey({
    path: new URL(request.url).pathname,
    format,
    width,
  });

  const r2Cache = await fetchR2Cache(bucket, r2CacheKey);
  if (r2Cache) {
    if (caches) {
      waitUntil(caches.default.put(cacheKey, r2Cache.clone()));
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
      waitUntil(caches.default.put(cacheKey, response.clone()));
    }
    waitUntil(bucket.put(r2CacheKey, buffer));
  }

  return response;
};
