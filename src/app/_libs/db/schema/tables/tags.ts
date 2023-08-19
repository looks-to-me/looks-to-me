import { relations, type InferModel } from "drizzle-orm";
import { sqliteTable, text, integer, unique } from "drizzle-orm/sqlite-core";
import { imageTags } from "./imageTags";

export const tags = sqliteTable('tags', {
  name: text('name').primaryKey(),
  createdAt: integer('posted_at', { mode: 'timestamp_ms' }).notNull(),
}, t => ({
  nameUnique: unique().on(t.name),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  imageTags: many(imageTags),
}));


export type Tag = InferModel<typeof tags>;
