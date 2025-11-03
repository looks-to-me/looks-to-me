import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const images = sqliteTable('images', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  uploadedAt: integer('uploaded_at', { mode: 'timestamp_ms' }).notNull(),
});
