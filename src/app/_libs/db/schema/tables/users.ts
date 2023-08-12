import { relations } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

import { images } from './images';

import type { InferModel } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  displayName: text('display_name').notNull(),
  avatarUrl: text('avatar_url').notNull(),
  registeredAt: integer('registered_at', { mode: 'timestamp_ms' }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  images: many(images),
}));

export type User = InferModel<typeof users>;
