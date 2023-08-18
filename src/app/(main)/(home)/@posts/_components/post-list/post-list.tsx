import { PostListPresenter } from './post-list-presenter';
import { fetchPosts } from '../../_actions/fetch-posts';

import type { ComponentPropsWithoutRef , FC } from 'react';

export type PostListProps = ComponentPropsWithoutRef<'div'>;

export const PostList: FC<PostListProps> = async ({
  ...props
}) => {
  const posts = await fetchPosts();

  const fetcher = async (offset: number) => {
    'use server';
    return await fetchPosts({ offset });
  };

  return (
    <PostListPresenter
      {...props}
      posts={posts}
      fetcher={fetcher}
    />
  );
};
