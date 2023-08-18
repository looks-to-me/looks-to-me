import { fetchPosts } from './actions/fetch-posts';
import { PostListPresenter } from './post-list-presenter';

import type { InfiniteScrollFetcher } from '../../../../../_components/infinite-scroll';
import type { ComponentPropsWithoutRef , FC } from 'react';

export type PostListProps = ComponentPropsWithoutRef<'div'>;

export const PostList: FC<PostListProps> = async ({
  ...props
}) => {
  const posts = await fetchPosts();

  const fetcher: InfiniteScrollFetcher = async args => {
    'use server';
    return await fetchPosts(args.cursor);
  };

  return (
    <PostListPresenter
      {...props}
      posts={posts}
      fetcher={fetcher}
    />
  );
};
