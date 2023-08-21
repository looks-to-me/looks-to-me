'use server';

import { sql } from 'drizzle-orm';

import { db } from '../../../../_libs/db';
import { schema } from '../../../../_libs/db/schema';
import { Post } from '../../../_components/post';

import type { InfiniteScrollEdge } from '../../../../_components/infinite-scroll';

const limit = 32;

export const fetchPosts = async (): Promise<InfiniteScrollEdge[]> => {
  const posts = await db()
    .select()
    .from(schema.posts)
    .where(sql`_ROWID_ >= (ABS(RANDOM()) % ((SELECT MAX(_ROWID_) FROM posts) - ${limit} + 2))`)
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
          image: `/images/posts/${post.id}/`,
        }}
      />
    ),
  }));
};
