import { relations } from 'drizzle-orm';
import { text, sqliteTable, unique } from 'drizzle-orm/sqlite-core';

import { users } from './users';

import type { InferModel } from 'drizzle-orm';

export const images = sqliteTable('images', {
  id: text('id').primaryKey(),
  key: text('key').notNull(),
  userId: text('user_id').notNull().references(() => users.id),
}, (t) => ({
  keyUnq: unique('images_key_unique').on(t.key),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  user: one(users),
}));

export type Image = InferModel<typeof images>;
