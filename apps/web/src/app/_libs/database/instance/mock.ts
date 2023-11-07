import sqlite3InitModule from '@sqlite.org/sqlite-wasm';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import { z } from 'zod';

import { initDatabase } from './index';
import { schema } from '../schema';

const getJournal = async () => {
  const result = await fetch('./meta/_journal.json').then(result => result.text());
  return z.object({
    entries: z.array(z.object({
      tag: z.string(),
    })),
  }).parse(JSON.parse(result));
};

const getQuery = async (tag: string) => {
  return await fetch(`./${tag}.sql`).then(result => result.text());
};

export const initMockDatabase = async () => {
  const sqlite = await sqlite3InitModule().then(sqlite => new sqlite.oo1.JsStorageDb('local'));
  const database = drizzle(async (sql, parameters) => {
    return await new Promise(resolve => {
      try {
        const rows = sqlite.exec( {
          sql,
          bind: parameters,
          rowMode: 'array',
          returnValue: 'resultRows',
        });
        resolve({ rows });
      } catch (error) {
        console.error(error);
        resolve({ rows: [] });
      }
    });
  }, { schema });
  initDatabase(database);

  const tables = await database.all<string[]>(sql.raw('SELECT name FROM sqlite_master WHERE type=\'table\';'));
  for (const table of tables ?? []) {
    await database.run(sql.raw(`DROP TABLE ${String(table[0])};`));
  }

  const journal = await getJournal();
  for (const entry of journal.entries) {
    const query = await getQuery(entry.tag);
    await database.run(sql.raw(query));
  }
};
