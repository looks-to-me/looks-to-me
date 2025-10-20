import { fetchPosts } from './_actions/fetch-posts';
import { PostList } from '../../_components/post-list';

import type { FC } from 'react';

export type ShufflePostListPageProps = PageProps<'/shuffle'>;

const ShufflePostListPage: FC<ShufflePostListPageProps> = async () => {
  const posts = await fetchPosts();

  const fetcher = async () => {
    'use server';
    return await fetchPosts();
  };

  return (
    <PostList
      posts={posts}
      fetcher={fetcher}
    />
  );
};

export default ShufflePostListPage;
