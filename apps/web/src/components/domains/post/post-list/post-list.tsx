import { clsx } from 'clsx';

import * as styles from './post-list.css';
import { InfiniteScroll } from '../../../elements/infinite-scroll';

import type { InfiniteScrollFetcher, InfiniteScrollEdge } from '../../../elements/infinite-scroll';
import type { ComponentProps, FC } from 'react';

export type PostListProps = ComponentProps<'div'> & {
  posts: InfiniteScrollEdge[];
  fetcher: InfiniteScrollFetcher;
};

export const PostList: FC<PostListProps> = ({
  className,
  posts,
  fetcher,
  ...props
}) => {
  return (
    <InfiniteScroll
      {...props}
      className={clsx(className, styles.list)}
      edges={posts}
      fetcher={fetcher}
    />
  );
};
