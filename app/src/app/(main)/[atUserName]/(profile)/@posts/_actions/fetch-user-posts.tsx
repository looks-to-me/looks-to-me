'use server';

import { desc, eq, lt } from 'drizzle-orm';

import { db } from '../../../../../_libs/db';
import { schema } from '../../../../../_libs/db/schema';
import { Post } from '../../../../_components/post';

import type { InfiniteScrollEdge } from '../../../../../_components/infinite-scroll';

const limit = 32;

export const fetchUserPosts = async (userId: string, cursor?: string): Promise<InfiniteScrollEdge[]> => {
  const posts = await db()
    .select({
      id: schema.posts.id,
      word: schema.posts.word,
      postedAt: schema.posts.postedAt,
      user: {
        name: schema.userProfiles.name,
      },
    })
    .from(schema.posts)
    .innerJoin(schema.users, eq(schema.posts.userId, schema.users.id))
    .innerJoin(schema.userProfiles, eq(schema.userProfiles.userId, schema.users.id))
    .where(eq(schema.posts.userId, userId))
    .where(cursor ? lt(schema.posts.postedAt, new Date(cursor)) : undefined)
    .orderBy(desc(schema.posts.postedAt))
    .limit(limit)
    .all();

  return posts.map(post => ({
    cursor: post.postedAt.toISOString(),
    node: (
      <Post
        key={post.id}
        post={{
          id: post.id,
          word: post.word,
          image: `/images/posts/${post.id}`,
          link: `/@${post.user.name}/posts/${post.id}`,
        }}
      />
    ),
  }));
};