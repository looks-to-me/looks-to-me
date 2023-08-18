import clsx from 'clsx';

import * as styles from './post-list.css';
import { InfiniteScroll } from '../../../../../_components/infinite-scroll';

import type { ReactNode , ComponentPropsWithoutRef , FC } from 'react';

export type PostListPresenterProps = ComponentPropsWithoutRef<'div'> & {
  posts: ReactNode[];
  fetcher: (offset: number) => Promise<ReactNode[]>;
};

export const PostListPresenter: FC<PostListPresenterProps> = ({
  className,
  posts,
  fetcher,
  ...props
}) => {
  return (
    <InfiniteScroll
      {...props}
      className={clsx(className, styles.wrapper)}
      nodes={posts}
      fetcher={fetcher}
    />
  );
};
