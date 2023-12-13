import { drizzle } from 'drizzle-orm/d1';

import { privateEnv } from '../../env';
import { schema } from '../schema';

import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';

export type Database = BaseSQLiteDatabase<'async', unknown, typeof schema>;

let instance: Database | undefined;

export const initDatabase = (value: Database): void => {
  if (instance) return;
  instance = value;
};

export const database = (): Database => {
  if (instance) return instance;
  const database = drizzle(privateEnv().DB, { schema });
  initDatabase(database);
  return database;
};
