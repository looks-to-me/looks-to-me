import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

import type { InferModel } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  displayName: text('display_name'),
  avatarUrl: text('avatar_url'),
});

export type User = InferModel<typeof users>;
