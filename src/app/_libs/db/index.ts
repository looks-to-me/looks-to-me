import { drizzle } from 'drizzle-orm/d1';

import { schema } from './schema';
import { env } from '../env';

export const db = drizzle(env.DB, { schema });
