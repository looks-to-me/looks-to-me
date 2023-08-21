import { fetchPosts } from './_actions/fetch-posts';
import { PostList } from '../../_components/post-list';

import type { FC } from 'react';

export const runtime = 'edge';

const ShufflePostListPage: FC = async () => {
  const posts = await fetchPosts();

  return (
    <PostList
      posts={posts}
      fetcher={fetchPosts}
    />
  );
};

export default ShufflePostListPage;
