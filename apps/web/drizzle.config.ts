import type { Config } from 'drizzle-kit';

export default {
  dialect: 'sqlite',
  driver: 'd1-http',
  schema: './src/app/_libs/database/schema/tables/*',
  out: './migrations',
} satisfies Config;
