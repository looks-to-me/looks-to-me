'use server';

import { eq } from 'drizzle-orm';

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

export const findPostsByUserId = async (userId: User['id']): Promise<Post[]> => {
  return await db()
    .select({
      id: schema.posts.id,
      userId: schema.posts.userId,
      imageId: schema.posts.imageId,
      word: schema.posts.word,
    }).from(schema.posts)
    .where(eq(schema.posts.userId, userId))
    .all();
};
