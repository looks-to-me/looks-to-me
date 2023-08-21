import * as styles from './layout.css';

import type { FC, ReactNode } from 'react';

export const metadata = {
  title: 'Shuffle',
  robots: 'noindex',
};

export type ShuffleLayoutProps = {
  children: ReactNode;
  posts: ReactNode;
};

const ShuffleLayout: FC<ShuffleLayoutProps> = ({
  children,
  posts,
}) => {
  return (
    <>
      {children}
      <main className={styles.main}>
        {posts}
      </main>
    </>
  );
};

export default ShuffleLayout;
