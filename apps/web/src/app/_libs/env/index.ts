import * as v from 'valibot';

import { memoize } from '../../../helpers/memoize';

export const mockEnv: Record<string, unknown> = {};

export const publicEnv = memoize(() => {
  return v.parse(v.object({
    NEXT_PUBLIC_APP_ORIGIN: v.pipe(v.string(), v.url()),
    NEXT_PUBLIC_CDN_ORIGIN: v.pipe(v.string(), v.url()),
  }), {
    // Environment variables with the prefix NEXT_PUBLIC need to be explicitly specified up to the object keys.
    // This allows Next.js to overwrite its value with a hard-coded value during the build.
    NEXT_PUBLIC_APP_ORIGIN: process.env['NEXT_PUBLIC_APP_ORIGIN'],
    NEXT_PUBLIC_CDN_ORIGIN: process.env['NEXT_PUBLIC_CDN_ORIGIN'],
    ...mockEnv,
  });
});

export const privateEnv = memoize(() => {
  return v.parse(v.object({
    NODE_ENV: v.union([v.literal('production'), v.literal('development'), v.literal('test')]),
    DB: v.custom<D1Database>((value) => !!value && typeof value === 'object'),
    BUCKET: v.custom<R2Bucket>((value) => !!value && typeof value === 'object'),
    INTERNAL_API_TOKEN: v.string(),
    IMAGE_OVERLAY_WORKER_URL: v.pipe(v.string(), v.url()),
  }), {
    ...process.env,
    ...mockEnv,
  });
});
