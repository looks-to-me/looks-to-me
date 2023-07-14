import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

import type { InferModel } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
});

export type User = InferModel<typeof users>;
