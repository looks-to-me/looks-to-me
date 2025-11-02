import { tieredCache } from '@looks-to-me/package-tiered-cache';
import * as v from 'valibot';

const schema = v.object({
  width: v.optional(v.pipe(v.unknown(), v.transform(Number), v.minValue(1))),
});

export default {
  async fetch(request: Request, env: Env, context: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const query = v.parse(schema, {
      width: url.searchParams.get('width'),
    });
    const format = request.headers.get('accept')?.includes('image/webp') ? 'webp' : undefined;

    const cache = tieredCache({
      bucket: env.TIERED_CACHE,
      waitUntil: context.waitUntil.bind(context),
    });

    return cache(new URL(`${url.pathname}/${format ?? 'unknown'}/${query.width ?? 'default'}`, url), async () => {
      const origin = url.origin.replace('cdn.', '');
      return await fetch(`${origin}${url.pathname}`, {
        cf: {
          image: {
            ...(format ? { format } : {}),
            ...(query.width ? { width: query.width } : {}),
          },
        },
      });
    });
  },
};
