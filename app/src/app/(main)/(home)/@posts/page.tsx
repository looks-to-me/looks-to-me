import { fetchPosts } from './_actions/fetch-posts';
import { PostList } from '../../_components/post-list';

import type { InfiniteScrollFetcher } from '../../../_components/infinite-scroll';
import type { FC } from 'react';

export const runtime = 'edge';

const HomePostListPage: FC = async () => {
  const posts = await fetchPosts();

  const fetcher: InfiniteScrollFetcher = async args => {
    'use server';
    return await fetchPosts(args.cursor);
  };

  return (
    <PostList
      posts={posts}
      fetcher={fetcher}
    />
  );
};

export default HomePostListPage;
