import { relations } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

import { images } from './images';

import type { InferModel } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  displayName: text('display_name').notNull(),
  avatarUrl: text('avatar_url').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  images: many(images),
}));

export type User = InferModel<typeof users>;
