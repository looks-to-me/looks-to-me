import { clsx } from 'clsx';

import * as styles from './post-list.css';
import { InfiniteScroll } from '../../../../components/elements/infinite-scroll';

import type { InfiniteScrollFetcher , InfiniteScrollEdge } from '../../../../components/elements/infinite-scroll';
import type { ComponentPropsWithoutRef , FC } from 'react';

export type PostListProps = ComponentPropsWithoutRef<'div'> & {
  edges: InfiniteScrollEdge[];
  fetcher: InfiniteScrollFetcher;
};

export const PostList: FC<PostListProps> = ({
  className,
  edges,
  fetcher,
  ...props
}) => {
  return (
    <InfiniteScroll
      {...props}
      className={clsx(className, styles.wrapper)}
      edges={edges}
      fetcher={fetcher}
    />
  );
};
