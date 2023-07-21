import { drizzle } from 'drizzle-orm/d1';

import { schema } from './schema';
import { memoize } from '../../_helpers/memoize';
import { env } from '../env';

export const db = memoize(() => {
  return drizzle(env().DB, { schema });
});
