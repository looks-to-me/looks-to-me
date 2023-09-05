import { imageCache } from '@looks-to-me/package-image-cache';
import { z } from 'zod';

import type { CacheKeyParams } from '@looks-to-me/package-image-cache';

const schema = z.object({
  width: z.coerce.number().optional(),
});

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);
    const input = schema.parse({
      width: url.searchParams.get('width'),
    });

    const accept = request.headers.get('accept');
    const format = accept?.includes('image/webp') ? 'webp' : undefined;

    const key: CacheKeyParams = {
      path: url.pathname,
      width: input.width,
      format,
    };

    return imageCache(env.BUCKET, key, async () => {
      const origin = url.origin.replace('cdn.', '');
      return await fetch(`${origin}${url.pathname}`, {
        cf: {
          image: {
            ...(format ? { format } : {}),
            ...(input.width ? { width: input.width } : {}),
          },
        },
      });
    });
  },
};