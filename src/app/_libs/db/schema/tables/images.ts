import { relations } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

import { posts } from './posts';
import { users } from './users';

import type { InferModel } from 'drizzle-orm';

export const images = sqliteTable('images', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
});

export const imagesRelations = relations(images, ({ one, many }) => ({
  user: one(users),
  posts: many(posts),
}));

export type Image = InferModel<typeof images>;
