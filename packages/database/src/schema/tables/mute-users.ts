import { text, sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const muteUsers = sqliteTable('mute_users', {
  userId: text('user_id').notNull().references(() => users.id),
  muteUserId: text('mute_user_id').notNull().references(() => users.id),
}, (t) => ({
  muteUnique: primaryKey({ columns: [t.muteUserId, t.userId] }),
}));
