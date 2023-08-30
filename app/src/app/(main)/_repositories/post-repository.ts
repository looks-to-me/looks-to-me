'use server';

import { db } from '../../_libs/db';
import { schema } from '../../_libs/db/schema';

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
