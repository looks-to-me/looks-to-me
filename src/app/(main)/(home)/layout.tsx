import * as styles from './layout.css';

import type { FC, ReactNode } from 'react';

export const metadata = {
  title: {
    absolute: 'LooksToMe',
  },
  robots: 'noindex',
};

export type HomeLayoutProps = {
  children: ReactNode;
  posts: ReactNode;
};

const HomeLayout: FC<HomeLayoutProps> = ({
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

export default HomeLayout;
