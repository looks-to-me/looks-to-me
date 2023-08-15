import { relations } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

import { posts } from './posts';
import { users } from './users';

import type { InferModel } from 'drizzle-orm';

export const images = sqliteTable('images', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  uploadedAt: integer('uploaded_at', { mode: 'timestamp_ms' }).notNull(),
});

export const imagesRelations = relations(images, ({ one, many }) => ({
  user: one(users),
  posts: many(posts),
}));

export type Image = InferModel<typeof images>;
