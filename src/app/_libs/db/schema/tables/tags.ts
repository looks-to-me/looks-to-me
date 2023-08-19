import { relations, type InferModel } from "drizzle-orm";
import { sqliteTable, text, integer, unique } from "drizzle-orm/sqlite-core";
import { postTags } from "./postTags";

export const tags = sqliteTable('tags', {
  name: text('name').primaryKey(),
  createdAt: integer('posted_at', { mode: 'timestamp_ms' }).notNull(),
}, t => ({
  nameUnique: unique().on(t.name),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags),
}));


export type Tag = InferModel<typeof tags>;
