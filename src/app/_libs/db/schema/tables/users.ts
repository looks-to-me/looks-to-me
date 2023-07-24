import { relations, type InferModel } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

import { images } from './images';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
});

export const usersRelations = relations(users, ({ many }) => ({
  images: many(images),
}));

export type User = InferModel<typeof users>;
