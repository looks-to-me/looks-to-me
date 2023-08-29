import Link from 'next/link';

import * as styles from './layout.css';
import { Button } from '../../_components/button';
import { PageHeader } from '../_components/page-header';
import { PageLayout } from '../_components/page-layout';

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
    <PageLayout
      header={(
        <PageHeader>
          <Button className={styles.title} variant="ghost" size="medium" borderless asChild>
            <Link href="/">
              Home
            </Link>
          </Button>
        </PageHeader>
      )}
    >
      <main className={styles.main}>
        {posts}
        {children}
      </main>
    </PageLayout>
  );
};

export default HomeLayout;
