import path from 'node:path';

import { sql } from 'drizzle-orm';
import { readMigrationFiles } from 'drizzle-orm/migrator';

import { schema } from '../schema';

import type { Database } from '../instance';

export const migrate = async (database: Database) => {
  const migrations = readMigrationFiles({
    // eslint-disable-next-line unicorn/prefer-module
    migrationsFolder: path.join(__dirname, '../../../../../migrations'),
  });

  for (const migration of migrations) {
    for (const query of migration.sql) {
      await database.run(sql.raw(query));
    }
  }
};

export const truncate = async (database: Database) => {
  await database.delete(schema.posts);
  await database.delete(schema.postTags);
  await database.delete(schema.images);
  await database.delete(schema.tags);
  await database.delete(schema.userProfiles);
  await database.delete(schema.userProviders);
  await database.delete(schema.users);
};
