import sqlite3InitModule from '@sqlite.org/sqlite-wasm';
import { drizzle as drizzleProxy } from 'drizzle-orm/sqlite-proxy';

import * as schema from './schema';

import type { Database } from './index';

export const createDatabase = async (): Promise<Database> => {
  const sqlite = await sqlite3InitModule();

  const database = new sqlite.oo1.DB();
  return drizzleProxy(async (sql, parameters) => {
    return await new Promise((resolve) => {
      try {
        const rows = database.exec({
          sql,
          bind: parameters,
          rowMode: 'object',
          returnValue: 'resultRows',
        });
        resolve({ rows });
      } catch (error) {
        console.error(error);
        resolve({ rows: [] });
      }
    });
  }, { schema });
};
