import { fetchR2Cache, getCacheKey, getCaches, getR2CacheKey } from './helper';

import type { R2CacheKeyParameters } from './helper';

describe('helper', () => {
  describe('getCaches', () => {
    const originalCaches = globalThis.caches;

    afterEach(() => {
      globalThis.caches = originalCaches;
    });

    it('should return caches', () => {
      globalThis.caches = {} as CacheStorage;

      const result = getCaches();
      expect(result).toEqual(caches);
    });

    it('should return undefined', () => {
      globalThis.caches = undefined as unknown as CacheStorage;

      const result = getCaches();
      expect(result).toEqual(caches);
    });
  });

  describe('getCacheKey', () => {
    it('should return a Request', () => {
      const request = new Request('https://example.com');

      const result = getCacheKey(request);
      expect(result).toBeInstanceOf(Request);
    });

    it('should return a same properties', () => {
      const request = new Request('https://example.com', {
        method: 'POST',
        headers: new Headers({ foo: 'bar' }),
        body: JSON.stringify({ foo: 'bar' }),
      });

      const result = getCacheKey(request);
      expect(result.url).toEqual(request.url);
      expect(result.method).toEqual(request.method);
      expect(result.headers).toEqual(request.headers);
      expect(result.body).toEqual(request.body);
    });
  });

  describe('getR2CacheKey', () => {
    it('should return a key', () => {
      const parameters: R2CacheKeyParameters = {
        path: 'path',
        format: 'webp',
        width: 100,
      };

      const result = getR2CacheKey(parameters);
      expect(result).toEqual('caches/path/webp/100');
    });

    it('should return a key without width', () => {
      const parameters: R2CacheKeyParameters = {
        path: 'path',
        format: 'webp',
      };

      const result = getR2CacheKey(parameters);
      expect(result).toEqual('caches/path/webp');
    });

    it('should return a key without format', () => {
      const parameters: R2CacheKeyParameters = {
        path: 'path',
        width: 100,
      };

      const result = getR2CacheKey(parameters);
      expect(result).toEqual('caches/path/unknown/100');
    });

    it('should return a key without format and width', () => {
      const parameters: R2CacheKeyParameters = {
        path: 'path',
      };

      const result = getR2CacheKey(parameters);
      expect(result).toEqual('caches/path/unknown');
    });
  });

  describe('fetchR2Cache', () => {
    it('should return a response', async () => {
      const buffer = new ArrayBuffer(0);
      const bucket = {
        get: jest.fn().mockResolvedValue({
          writeHttpMetadata: jest.fn().mockImplementation((headers: Headers) => {
            headers.set('metadata', 'metadata');
          }),
          httpEtag: 'etag',
          arrayBuffer: jest.fn().mockResolvedValue(buffer),
        }),
      } as unknown as R2Bucket;
      const key = 'key';

      const result = await fetchR2Cache(bucket, key);
      await expect(result?.arrayBuffer()).resolves.toEqual(buffer);
      expect(result?.headers.get('etag')).toEqual('etag');
      expect(result?.headers.get('metadata')).toEqual('metadata');
      expect(result?.headers.get('cache-control')).toEqual('public, max-age=31536000, immutable');
    });

    it('should return undefined', async () => {
      const bucket = {
        // eslint-disable-next-line unicorn/no-useless-undefined
        get: jest.fn().mockResolvedValue(undefined),
      } as unknown as R2Bucket;
      const key = 'key';

      const result = await fetchR2Cache(bucket, key);
      expect(result).toBeUndefined();
    });
  });
});
