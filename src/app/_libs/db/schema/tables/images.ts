import { text, sqliteTable, unique } from 'drizzle-orm/sqlite-core';

import { relations, type InferModel } from 'drizzle-orm';
import { users } from './users';

export const images = sqliteTable('images', {
  id: text('id').primaryKey(),
  key: text('key').notNull(),
  userId: text('userId').notNull().references(() => users.id),
}, (t) => ({
  keyUnq: unique('images_key_unique').on(t.key),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  user: one(users),
}))

export type Image = InferModel<typeof images>;
