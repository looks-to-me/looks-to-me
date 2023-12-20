import { fetchPosts } from './_actions/fetch-posts';
import { getLoginUser } from '../../../../queries/user/get-login-user';
import { PostList } from '../../_components/post-list';

import type { InfiniteScrollFetcher } from '../../../../components/elements/infinite-scroll';
import type { PageProps } from '../../../../types/page-props';
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
  const loginUser = await getLoginUser();
  const posts = await fetchPosts({
    cursor: undefined,
    loginUserId: loginUser ? loginUser.id : undefined,
  });

  const fetcher: InfiniteScrollFetcher = async arguments_ => {
    'use server';
    const loginUser = await getLoginUser();
    return await fetchPosts({
      cursor: arguments_.cursor,
      loginUserId: loginUser ? loginUser.id : undefined,
    });
  };

  return (
    <PostList
      posts={posts}
      fetcher={fetcher}
    />
  );
};

export default HomePostListPage;
