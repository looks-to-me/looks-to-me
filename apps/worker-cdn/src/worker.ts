import { imageCache } from '@looks-to-me/package-image-cache';
import { z } from 'zod';

import type { ImageCacheParameters } from '@looks-to-me/package-image-cache';

const schema = z.object({
  width: z.coerce.number().optional(),
});

export default {
  async fetch(
    request: Request,
    env: Env,
    context: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);
    const input = schema.parse({
      width: url.searchParams.get('width'),
    });

    const format = request.headers.get('accept')?.includes('image/webp') ? 'webp' : undefined;

    const parameters: ImageCacheParameters = {
      request,
      format,
      width: input.width,
      bucket: env.BUCKET,
      waitUntil: context.waitUntil.bind(context),
    };

    return imageCache(parameters, async () => {
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
