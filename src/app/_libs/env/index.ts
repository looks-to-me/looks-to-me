import { createEnv } from '@t3-oss/env-nextjs';
import { binding } from 'cf-bindings-proxy';
import { z } from 'zod';

import { memoize } from '../../_helpers/memoize';

import type { D1Database, R2Bucket } from '@cloudflare/workers-types';

export const env = memoize(() => {
  return createEnv({
    server: {
      DB: z.custom<D1Database>(value => value && typeof value === 'object'),
      BUCKET: z.custom<R2Bucket>(value => value && typeof value === 'object'),
    },
    runtimeEnv: {
      DB: binding('DB'),
      BUCKET: binding('BUCKET'),
    },
  });
});
