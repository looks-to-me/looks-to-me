import { relations, type InferModel } from "drizzle-orm";
import { sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { tags } from "./tags";
import { posts } from "./posts";

export const postTags = sqliteTable('post_tags', {
  postId: text('post_id').notNull(),
  tagName: text('tag_name').notNull(),
}, t => ({
  postTagUnique: unique().on(t.postId, t.tagName),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts),
  tag: one(tags, {
    fields: [postTags.tagName],
    references: [tags.name],
  }),
}));

export type ImageTag = InferModel<typeof postTags>;

