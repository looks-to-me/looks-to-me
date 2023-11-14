import { createEnv } from '@t3-oss/env-nextjs';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { z } from 'zod';

import { memoize } from '../../_helpers/memoize';

const isBuildPhase = process.env['NEXT_PHASE'] === PHASE_PRODUCTION_BUILD;

export const env = memoize(() => {
  return createEnv({
    isServer: isBuildPhase ? false : typeof window === 'undefined',
    client: {
      NEXT_PUBLIC_APP_ORIGIN: z.string().url(),
      NEXT_PUBLIC_CDN_ORIGIN: z.string().url(),
    },
    server: {
      NODE_ENV: z.enum(['production', 'development', 'test']),
      DB: z.custom<D1Database>(value => value && typeof value === 'object'),
      BUCKET: z.custom<R2Bucket>(value => value && typeof value === 'object'),
      INTERNAL_API_TOKEN: z.string(),
      IMAGE_OVERLAY_WORKER_URL: z.string().url(),
    },
    runtimeEnv: {
      NEXT_PUBLIC_APP_ORIGIN: process.env['NEXT_PUBLIC_APP_ORIGIN'],
      NEXT_PUBLIC_CDN_ORIGIN: process.env['NEXT_PUBLIC_CDN_ORIGIN'],
      NODE_ENV: process.env.NODE_ENV,
      DB: process.env['DB'],
      BUCKET: process.env['BUCKET'],
      INTERNAL_API_TOKEN: process.env['INTERNAL_API_TOKEN'],
      IMAGE_OVERLAY_WORKER_URL: process.env['IMAGE_OVERLAY_WORKER_URL'],
    },
  });
});
