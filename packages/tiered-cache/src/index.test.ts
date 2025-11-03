import { beforeEach, describe, expect, test, vi } from 'vitest';

import { tieredCache } from './index';

vi.mock('cloudflare:workers');

describe('tieredCache', () => {
  const key = new URL('https://example.com');
  const body = 'Hello, world!';

  const callback = vi.fn();
  const cacheMatch = vi.fn();
  const cachePut = vi.fn();
  const r2Get = vi.fn();
  const r2Put = vi.fn();
  const r2List = vi.fn();
  const r2Delete = vi.fn();

  const cache = tieredCache({
    cache: { match: cacheMatch, put: cachePut } as unknown as Cache,
    bucket: { get: r2Get, put: r2Put, list: r2List, delete: r2Delete } as unknown as R2Bucket,
    waitUntil: vi.fn(),
  });

  describe('when edge cache is exists', () => {
    beforeEach(() => {
      cacheMatch.mockResolvedValue(new Response(body));
    });

    test('should return edge cache response', async () => {
      const result = await cache(key, callback);

      expect(await result.text()).toBe(body);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('when edge cache is not exists', () => {
    describe('when R2 cache is exists', () => {
      beforeEach(() => {
        r2Get.mockResolvedValue({ body });
      });

      test('should return R2 cache response', async () => {
        const result = await cache(key, callback);

        expect(await result.text()).toBe(body);
        expect(callback).not.toHaveBeenCalled();
      });

      test('should put edge cache', async () => {
        await cache(key, callback);

        expect(cachePut).toHaveBeenCalled();
      });
    });

    describe('when R2 cache is not exists', () => {
      describe('when callback response is ok', () => {
        beforeEach(() => {
          callback.mockResolvedValue(new Response(body, { status: 200 }));
        });

        test('should return callback response', async () => {
          const result = await cache(key, callback);

          expect(await result.text()).toBe(body);
          expect(callback).toHaveBeenCalled();
        });

        test('should put edge cache', async () => {
          await cache(key, callback);

          expect(cachePut).toHaveBeenCalled();
        });

        test('should put R2 cache', async () => {
          await cache(key, callback);

          expect(r2Put).toHaveBeenCalled();
        });
      });

      describe('when callback response is not ok', () => {
        beforeEach(() => {
          callback.mockResolvedValue(new Response(body, { status: 500 }));
        });

        test('should return callback response', async () => {
          const result = await cache(key, callback);

          expect(await result.text()).toBe(body);
          expect(callback).toHaveBeenCalled();
        });

        test('should not put edge cache', async () => {
          await cache(key, callback);

          expect(cachePut).not.toHaveBeenCalled();
        });

        test('should not put R2 cache', async () => {
          await cache(key, callback);

          expect(r2Put).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      r2List.mockResolvedValue({ objects: [{ key: 'key1' }, { key: 'key2' }] });
    });

    test('should delete R2 cache', async () => {
      await cache.delete('prefix/');

      expect(r2Delete).toHaveBeenCalledTimes(2);
      expect(r2Delete).toHaveBeenCalledWith('key1');
      expect(r2Delete).toHaveBeenCalledWith('key2');
    });
  });
});
