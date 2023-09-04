import type { R2Bucket } from '@cloudflare/workers-types';

declare global {
  interface Env {
    BUCKET: R2Bucket;
  }
}
