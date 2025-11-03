import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { sql } from 'drizzle-orm';
import { readMigrationFiles } from 'drizzle-orm/migrator';

export const migrate = async () => {
  const { database } = await import('@looks-to-me/package-database');

  const migrations = readMigrationFiles({
    migrationsFolder: path.join(fileURLToPath(import.meta.resolve('@looks-to-me/package-database')), '../../migrations'),
  });

  for (const migration of migrations) {
    for (const query of migration.sql) {
      await database().run(sql.raw(query));
    }
  }
};
