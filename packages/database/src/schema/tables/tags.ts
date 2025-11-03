import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const tags = sqliteTable('tags', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
});
