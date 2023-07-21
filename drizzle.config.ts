import type { Config } from 'drizzle-kit';

export default {
  schema: './src/app/_libs/db/schema/tables/*',
  out: './migrations',
} satisfies Config;
