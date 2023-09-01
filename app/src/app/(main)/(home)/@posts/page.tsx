import { fetchPosts } from './_actions/fetch-posts';
import { PostList } from '../../_components/post-list';

import type { InfiniteScrollFetcher } from '../../../_components/infinite-scroll';
import type { PageProps } from '../../../_types/page-props';
import type { HomePageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type HomePostListPageProps = HomePageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const HomePostListPage: FC<HomePostListPageProps> = async () => {
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
