import { drizzle } from 'drizzle-orm/d1';

import { privateEnv } from '../../env';
import { schema } from '../schema';

import type { DrizzleD1Database } from 'drizzle-orm/d1';

export type Database = DrizzleD1Database<typeof schema>;

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
