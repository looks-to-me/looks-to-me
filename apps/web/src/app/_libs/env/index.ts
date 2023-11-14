import { literal, object, parse, special, string, union, url } from 'valibot';

import { memoize } from '../../_helpers/memoize';

export const publicEnv = memoize(() => {
  return parse(object({
    NEXT_PUBLIC_APP_ORIGIN: string([url()]),
    NEXT_PUBLIC_CDN_ORIGIN: string([url()]),
  }), {
    // Environment variables with the prefix NEXT_PUBLIC need to be explicitly specified up to the object keys.
    // This allows Next.js to overwrite its value with a hard-coded value during the build.
    NEXT_PUBLIC_APP_ORIGIN: process.env['NEXT_PUBLIC_APP_ORIGIN'],
    NEXT_PUBLIC_CDN_ORIGIN: process.env['NEXT_PUBLIC_CDN_ORIGIN'],
  });
});

export const privateEnv = memoize(() => {
  return parse(object({
    NODE_ENV: union([literal('production'), literal('development'), literal('test')]),
    DB: special<D1Database>((value) => !!value && typeof value === 'object'),
    BUCKET: special<R2Bucket>((value) => !!value && typeof value === 'object'),
    INTERNAL_API_TOKEN: string(),
    IMAGE_OVERLAY_WORKER_URL: string([url()]),
  }), process.env);
});
