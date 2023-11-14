import { getCaches } from './helper';
import { imageCache } from './index';

import type { ImageCacheParameters } from './index';

jest.mock('./helper', () => {
  const original = jest.requireActual('./helper');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...original,
    getCaches: jest.fn(),
  };
});

describe('imageCache', () => {
  it('should return a response from the edge cache if it exists', async () => {
    const parameters: ImageCacheParameters = {
      request: new Request('https://example.com/image.png'),
      bucket: {
        get: jest.fn(),
        put: jest.fn(),
      } as unknown as R2Bucket,
    };

    const callback = jest.fn();

    const response = new Response();
    jest.mocked(getCaches).mockReturnValue({
      open: jest.fn(),
      default: {
        match: jest.fn().mockResolvedValue(response),
        put: jest.fn(),
        delete: jest.fn(),
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
        get: jest.fn().mockResolvedValue({
          writeHttpMetadata: jest.fn().mockImplementation((headers: Headers) => {
            headers.set('metadata', 'metadata');
          }),
          httpEtag: 'etag',
          arrayBuffer: jest.fn().mockResolvedValue(buffer),
        }),
        put: jest.fn(),
      } as unknown as R2Bucket,
    };

    const callback = jest.fn();

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
        get: jest.fn(),
        put: jest.fn(),
      } as unknown as R2Bucket,
    };

    const buffer = new ArrayBuffer(0);
    const callback = jest.fn().mockResolvedValue(new Response(buffer, {
      headers: {
        'etag': 'etag',
        'cache-control': 'public, max-age=31536000, immutable',
      },
    }));

    jest.mocked(getCaches).mockReturnValue({
      open: jest.fn(),
      default: {
        match: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
      },
    });

    const result = await imageCache(parameters, callback);

    expect(result?.headers.get('etag')).toEqual('etag');
    expect(result?.headers.get('cache-control')).toEqual('public, max-age=31536000, immutable');
    await expect(result?.arrayBuffer()).resolves.toEqual(buffer);
    expect(callback).toHaveBeenCalled();
  });
});
