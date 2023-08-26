import { relations } from 'drizzle-orm';
import { text, sqliteTable, unique } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const userProviders = sqliteTable('user_providers', {
  userId: text('user_id').notNull(),
  provider: text('provider').notNull(),
  sub: text('sub').notNull(),
}, t => ({
  subUnique: unique().on(t.provider, t.sub),
}));

export const userProvidersRelations = relations(userProviders, ({ one }) => ({
  user: one(users),
}));

export type UserProvider = typeof userProviders._.inferSelect;
