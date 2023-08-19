import { relations } from 'drizzle-orm';
import { text, sqliteTable, integer, unique } from 'drizzle-orm/sqlite-core';

import { images } from './images';
import { users } from './users';
import { postTags } from './postTags';

import type { InferModel } from 'drizzle-orm';

export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  imageId: text('image_id').notNull().references(() => images.id),
  word: text('word').notNull(),
  postedAt: integer('posted_at', { mode: 'timestamp_ms' }).notNull(),
}, t => ({
  wordUnique: unique().on(t.imageId, t.word),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users),
  image: one(images),
  postTags: many(postTags),
}));

export type Post = InferModel<typeof posts>;
