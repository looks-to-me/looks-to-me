'use server';

import { createId } from '@paralleldrive/cuid2';

import { Post } from '../_components/post';

import type { ReactNode } from 'react';

export type FetchPostsArgs = {
  limit?: number;
  offset?: number;
};

// TODO: Fetch posts from database.
export const fetchPosts = async (args?: FetchPostsArgs): Promise<ReactNode[]> => {
  return Promise.resolve(Array.from({ length: args?.limit ?? 32 }).map(() => {
    const id = createId();
    return (
      <Post
        key={id}
        post={{
          id,
          word: 'Good',
          image: `/images/posts/${id}/`,
        }}
      />
    );
  }));
};
