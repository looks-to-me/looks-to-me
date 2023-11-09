import { drizzle } from 'drizzle-orm/d1';

import { env } from '../../env';
import { schema } from '../schema';

import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';

let instance: BaseSQLiteDatabase<'async', unknown, typeof schema> | undefined;

export const initDatabase = (value: Exclude<typeof instance, undefined>): void => {
  if (instance) return;
  instance = value;
};

export const database = (): Exclude<typeof instance, undefined> => {
  if (instance) return instance;
  const database = drizzle(env().DB, { schema });
  initDatabase(database);
  return database;
};
