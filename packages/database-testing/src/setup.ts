import { afterEach, beforeAll, vi } from 'vitest';

import { migrate } from './helpers/migrate';
import { truncate } from './helpers/truncate';

import type { Database } from '@looks-to-me/package-database';

export const setupDatabase = (database: Database) => {
  vi.doMock(import('@looks-to-me/package-database'), async (importOriginal) => {
    const module = await importOriginal();
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const mockDatabase = () => database;
    mockDatabase.schema = module.database.schema;
    return {
      ...module,
      database: mockDatabase,
    };
  });

  beforeAll(async () => {
    await migrate();
  });

  afterEach(async () => {
    await truncate();
  });
};
