import { createEnv } from '@t3-oss/env-nextjs';
import { binding } from 'cf-bindings-proxy';
import { z } from 'zod';

import { memoize } from '../../_helpers/memoize';

import type { Fetcher, D1Database, R2Bucket } from '@cloudflare/workers-types';

export const env = memoize(() => {
  return createEnv({
    server: {
      NODE_ENV: z.enum(['production', 'development', 'test']),
      DB: z.custom<D1Database>(value => value && typeof value === 'object'),
      BUCKET: z.custom<R2Bucket>(value => value && typeof value === 'object'),
      IMAGE_OVERLAY: z.custom<Fetcher>(value => value && typeof value === 'object'),
      POST_RAW_IMAGE_TOKEN: z.string(),
    },
    runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,
      DB: binding('DB'),
      BUCKET: binding('BUCKET'),
      IMAGE_OVERLAY: binding('IMAGE_OVERLAY'),
      POST_RAW_IMAGE_TOKEN: process.env['POST_RAW_IMAGE_TOKEN'],
    },
  });
});
