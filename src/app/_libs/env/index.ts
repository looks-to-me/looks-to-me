import { createEnv } from '@t3-oss/env-nextjs';
import { binding } from 'cf-bindings-proxy';
import { z } from 'zod';

import type { D1Database } from '@cloudflare/workers-types';

export const env = createEnv({
  server: {
    DB: z.custom<D1Database>(value => value && typeof value === 'object'),
  },
  runtimeEnv: {
    DB: binding('DB'),
  },
});
