import { AsyncLocalStorage } from 'node:async_hooks';

import { drizzle as drizzleD1 } from 'drizzle-orm/d1';

import * as _schema from './schema';

import type { AnyD1Database } from 'drizzle-orm/d1';
import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';

export type Database = BaseSQLiteDatabase<'async', unknown, typeof _schema>;

export const createDatabase = (client: AnyD1Database): Database => {
  return drizzleD1(client, { schema: _schema });
};

const storage = new AsyncLocalStorage<Database>();

export const withDatabase = <T>(database: Database, fn: () => T): T => {
  return storage.run(database, fn);
};

// eslint-disable-next-line func-style
export function database(): Database {
  const database = storage.getStore();
  if (!database) {
    throw new Error('Database not provided');
  }
  return database;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace database {
  export import schema = _schema;
}
