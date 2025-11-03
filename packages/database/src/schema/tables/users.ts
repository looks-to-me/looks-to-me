import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  registeredAt: integer('registered_at', { mode: 'timestamp_ms' }).notNull(),
});
