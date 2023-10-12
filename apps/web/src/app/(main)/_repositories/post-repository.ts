'use server';

import { eq, sql } from 'drizzle-orm';

import { db } from '../../_libs/db';
import { schema } from '../../_libs/db/schema';

import type { User } from './user-repository';

export type Post = {
  id: string;
  userId: string;
  imageId: string;
  word: string;
};

export const insertPost = async (post: Post): Promise<Post> => {
  await db()
    .insert(schema.posts)
    .values({
      id: post.id,
      userId: post.userId,
      imageId: post.imageId,
      word: post.word,
      postedAt: new Date(),
    })
    .run();

  return post;
};

export const deletePost = async (id: Post['id']): Promise<void> => {
  await db()
    .delete(schema.posts)
    .where(eq(schema.posts.id, id));
};

export const findPostById = async (id: Post['id']): Promise<Post | undefined> => {
  return await db()
    .select({
      id: schema.posts.id,
      userId: schema.posts.userId,
      imageId: schema.posts.imageId,
      word: schema.posts.word,
    })
    .from(schema.posts)
    .where(eq(schema.posts.id, id))
    .get();
};

export const countPostsByUserId = async (userId: User['id']): Promise<number> => {
  const result = await db()
    .select({
      count: sql<number>`COUNT(*)`,
    }).from(schema.posts)
    .where(eq(schema.posts.userId, userId))
    .get();

  return result?.count ?? 0;
};