import type { Config } from 'drizzle-kit';

export default {
  schema: './src/app/_libs/database/schema/tables/*',
  out: './migrations',
} satisfies Config;
