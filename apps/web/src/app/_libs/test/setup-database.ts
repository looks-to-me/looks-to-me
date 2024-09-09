import { beforeEach } from 'vitest';

import { database } from '../database';
import { migrate, truncate } from '../database/helpers';

export const setupDatabase = () => {
  let isMigrated = false;

  beforeEach(async () => {
    if (isMigrated) {
      await truncate(database());
      return;
    }

    await migrate(database());
    isMigrated = true;
  });
};
