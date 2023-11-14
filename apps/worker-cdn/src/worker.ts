import { imageCache } from '@looks-to-me/package-image-cache';
import { coerce, minValue, number, object, optional, parse } from 'valibot';

import type { ImageCacheParameters } from '@looks-to-me/package-image-cache';

const schema = object({
  width: optional(coerce(number([minValue(1)]), Number)),
});

export default {
  async fetch(
    request: Request,
    env: Env,
    context: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);
    const input = parse(schema, {
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
