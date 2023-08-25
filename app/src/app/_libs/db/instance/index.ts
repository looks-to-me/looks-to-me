import { drizzle } from 'drizzle-orm/d1';

import { env } from '../../env';
import { schema } from '../schema';

import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';

let instance: BaseSQLiteDatabase<'async', unknown, typeof schema> | undefined = undefined;

export const initDatabase = (value: Exclude<typeof instance, undefined>): void => {
  if (instance) return;
  instance = value;
};

export const db = (): Exclude<typeof instance, undefined> => {
  if (instance) return instance;
  const db = drizzle(env().DB, { schema });
  initDatabase(db);
  return db;
};
