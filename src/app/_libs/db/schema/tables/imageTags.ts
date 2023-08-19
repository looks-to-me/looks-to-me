import { relations, type InferModel } from "drizzle-orm";
import { sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { images } from "./images";
import { tags } from "./tags";

export const imageTags = sqliteTable('image_tags', {
  imageId: text('image_id').notNull(),
  tagName: text('tag_name').notNull(),
}, t => ({
  imageTagUnique: unique().on(t.imageId, t.tagName),
}));

export const imageTagsRelations = relations(imageTags, ({ one }) => ({
  image: one(images),
  tag: one(tags, {
    fields: [imageTags.tagName],
    references: [tags.name],
  }),
}));

export type ImageTag = InferModel<typeof imageTags>;

