import { describe, expect, it, vi } from 'vitest';

import { getCaches } from './helper';
import { deleteImageCache, imageCache } from './index';

import type { ImageCacheParameters } from './index';

vi.mock('./helper', async () => {
  const original = await vi.importActual('./helper');
  return {
    ...original,
    getCaches: vi.fn(),
  };
});

describe('imageCache', () => {
  it('should return a response from the edge cache if it exists', async () => {
    const parameters: ImageCacheParameters = {
      request: new Request('https://example.com/image.png'),
      bucket: {
        get: vi.fn(),
        put: vi.fn(),
      } as unknown as R2Bucket,
    };

    const callback = vi.fn();

    const response = new Response();
    vi.mocked(getCaches).mockReturnValue({
      open: vi.fn(),
      default: {
        match: vi.fn().mockResolvedValue(response),
        put: vi.fn(),
        delete: vi.fn(),
      },
    });

    const result = await imageCache(parameters, callback);

    expect(result).toEqual(response);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should return a response from the r2 cache if it exists', async () => {
    const buffer = new ArrayBuffer(0);
    const parameters: ImageCacheParameters = {
      request: new Request('https://example.com/image.png'),
      bucket: {
        get: vi.fn().mockResolvedValue({
          writeHttpMetadata: vi.fn().mockImplementation((headers: Headers) => {
            headers.set('metadata', 'metadata');
          }),
          httpEtag: 'etag',
          arrayBuffer: vi.fn().mockResolvedValue(buffer),
        }),
        put: vi.fn(),
      } as unknown as R2Bucket,
    };

    const callback = vi.fn();

    const result = await imageCache(parameters, callback);

    expect(result?.headers.get('etag')).toEqual('etag');
    expect(result?.headers.get('metadata')).toEqual('metadata');
    expect(result?.headers.get('cache-control')).toEqual('public, max-age=31536000, immutable');
    await expect(result?.arrayBuffer()).resolves.toEqual(buffer);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should return a response from the callback if not exists cache', async () => {
    const parameters: ImageCacheParameters = {
      request: new Request('https://example.com/image.png'),
      bucket: {
        get: vi.fn(),
        put: vi.fn(),
      } as unknown as R2Bucket,
    };

    const buffer = new ArrayBuffer(0);
    const callback = vi.fn().mockResolvedValue(new Response(buffer, {
      headers: {
        'etag': 'etag',
        'cache-control': 'public, max-age=31536000, immutable',
      },
    }));

    vi.mocked(getCaches).mockReturnValue({
      open: vi.fn(),
      default: {
        match: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
      },
    });

    const result = await imageCache(parameters, callback);

    expect(result?.headers.get('etag')).toEqual('etag');
    expect(result?.headers.get('cache-control')).toEqual('public, max-age=31536000, immutable');
    await expect(result?.arrayBuffer()).resolves.toEqual(buffer);
    expect(callback).toHaveBeenCalled();
  });
});

describe('deleteImageCache', () => {
  it('should delete all cache entries for a given postId', async () => {
    const bucket = {
      list: vi.fn().mockResolvedValue({
        objects: [
          { key: 'caches/images/posts/testPostId/webp' },
          { key: 'caches/images/posts/testPostId/webp/1920' },
          { key: 'caches/images/posts/testPostId/unknown/1920' },
        ],
      }),
      delete: vi.fn().mockResolvedValue(null),
    } as unknown as R2Bucket;

    await deleteImageCache({ bucket, path: 'images/posts/testPostId' });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(bucket.list).toHaveBeenCalledWith({ prefix: 'caches/images/posts/testPostId' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(bucket.delete).toHaveBeenCalledTimes(3);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(bucket.delete).toHaveBeenNthCalledWith(1, 'caches/images/posts/testPostId/webp');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(bucket.delete).toHaveBeenNthCalledWith(2, 'caches/images/posts/testPostId/webp/1920');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(bucket.delete).toHaveBeenNthCalledWith(3, 'caches/images/posts/testPostId/unknown/1920');
  });
});
