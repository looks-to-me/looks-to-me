import { fetchPosts } from './_actions/fetch-posts';
import { getInfinityScrollPropsByPosts } from '../../../../components/elements/infinite-scroll/_libs/get-infinityscroll-props-by-posts';
import { getLoginUser } from '../../../_actions/get-login-user';
import { PostList } from '../../_components/post-list';

import type { PageProps } from '../../../_types/page-props';
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
  const loginUser = await getLoginUser();
  const fetcher = async () => {
    'use server';
    const posts = await fetchPosts({ loginUserId: loginUser ? loginUser.id : undefined });
    return getInfinityScrollPropsByPosts(posts);
  };

  const edges = await fetcher();

  return (
    <PostList
      edges={edges}
      fetcher={fetcher}
    />
  );
};

export default ShufflePostListPage;
