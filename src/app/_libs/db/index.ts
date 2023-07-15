import { drizzle } from 'drizzle-orm/d1';

import { env } from '../env';

export const db = drizzle(env.DB);
