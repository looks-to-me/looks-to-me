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

export type ImageCacheParams = {
  key: CacheKeyParams;
  bucket: R2Bucket;
  waitUntil: ExecutionContext['waitUntil'];
};

export const imageCache = async (params: ImageCacheParams, callback: () => Promise<Response>) => {
  const key = cacheKey(params.key);
  const cache = await params.bucket.get(key);

  if (cache) {
    const headers = new Headers();
    cache.writeHttpMetadata(headers);
    headers.set('etag', cache.httpEtag);
    headers.set('cache-control', 'public, max-age=31536000, immutable');
    return new Response(await cache.arrayBuffer(), { headers });
  }

  const response = await callback();
  const buffer = await response.arrayBuffer();
  const headers = new Headers(response.headers);

  if (response.ok) {
    headers.set('cache-control', 'public, max-age=31536000, immutable');

    if (headers.get('content-type')?.startsWith('image/')) {
      params.waitUntil(params.bucket.put(key, buffer));
    }
  }

  return new Response(buffer, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
};
