export const getCaches = (): CacheStorage | undefined => {
  if (typeof caches === 'undefined') return undefined;
  return caches;
};

export const getCacheKey = (request: Request): Request => {
  return new Request(request.url.toString(), request);
};

export type R2CacheKeyParameters = {
  path: string;
  format?: 'webp' | 'png' | undefined;
  width?: number | undefined;
};

export const getR2CacheKey = (parameters: R2CacheKeyParameters): string => {
  const path = parameters.path.replaceAll(/^\/|\/$/g, '');
  const key = `caches/${path}/${parameters.format ?? 'unknown'}`;
  if (parameters.width) return `${key}/${parameters.width}`;
  return key;
};

export const fetchR2Cache = async (bucket: R2Bucket, key: string): Promise<Response | undefined> => {
  const r2ObjectBody = await bucket.get(key);
  if (!r2ObjectBody) return undefined;

  const headers = new Headers();
  r2ObjectBody.writeHttpMetadata(headers);
  headers.set('etag', r2ObjectBody.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000, immutable');
  return new Response(await r2ObjectBody.arrayBuffer(), { headers });
};
