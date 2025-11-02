const headers = {
  'Cache-Control': 'public, max-age=31536000, immutable',
};

export type TieredCache = {
  (key: URL, callback: () => Promise<Response>): Promise<Response>;
  delete(prefix: string): Promise<void>;
};

export type TieredCacheContext = {
  cache?: Cache;
  bucket: R2Bucket;
  waitUntil: ExecutionContext['waitUntil'];
};

export const tieredCache = ({
  cache = caches.default,
  bucket,
  waitUntil,
}: TieredCacheContext): TieredCache => {
  const store: TieredCache = async (key, callback) => {
    const cacheResponse = await cache.match(key);
    if (cacheResponse) return cacheResponse;

    const r2Cache = await bucket.get(key.pathname);
    if (r2Cache) {
      const response = new Response(r2Cache.body, { headers });
      waitUntil(cache.put(key, response.clone()));
      return response;
    }

    const callbackResponse = await callback();
    const response = new Response(callbackResponse.body, {
      headers: {
        ...callbackResponse.headers,
        ...(callbackResponse.ok ? headers : {}),
      },
      status: callbackResponse.status,
      statusText: callbackResponse.statusText,
    });
    if (callbackResponse.ok) {
      waitUntil(cache.put(key, response.clone()));
      waitUntil(bucket.put(key.pathname, response.clone().body));
    }
    return response;
  };

  store.delete = async (prefix: string) => {
    const result = await bucket.list({ prefix });
    const promises = result.objects.map((object) => bucket.delete(object.key));
    await Promise.all(promises);
  };

  return store;
};
