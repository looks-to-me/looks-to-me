import { fetchPosts } from './_actions/fetch-posts';
import { getLoginUser } from '../../../../queries/user/get-login-user';
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

const fetecher = async () => {
  'use server';
  const loginUser = await getLoginUser();
  return await fetchPosts({ loginUserId: loginUser ? loginUser.id : undefined });
};

const ShufflePostListPage: FC<ShufflePostListPageProps> = async () => {
  const posts = await fetecher();
  return (
    <PostList
      posts={posts}
      fetcher={fetecher}
    />
  );
};

export default ShufflePostListPage;
