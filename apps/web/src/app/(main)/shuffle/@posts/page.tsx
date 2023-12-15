import { fetchPosts } from './_actions/fetch-posts';
import { PostList } from '../../_components/post-list';

import type { PageProps } from '../../../../types/page-props';
import type { ShufflePageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type ShufflePostListPageProps = ShufflePageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const ShufflePostListPage: FC<ShufflePostListPageProps> = async () => {
  const posts = await fetchPosts();

  return (
    <PostList
      posts={posts}
      fetcher={fetchPosts}
    />
  );
};

export default ShufflePostListPage;
