import Link from 'next/link';

import * as styles from './layout.css';
import { Button } from '../../_components/button';
import { PageHeader } from '../_components/page-header';
import { PageLayout } from '../_components/page-layout';

import type { FC, ReactNode } from 'react';

export const metadata = {
  title: 'New post',
  robots: 'noindex',
};

export type NewPostLayoutProps = {
  children: ReactNode;
  auth: ReactNode;
};

const NewPostLayout: FC<NewPostLayoutProps> = ({
  children,
  auth,
}) => {
  return (
    <PageLayout
      header={(
        <PageHeader>
          <Button className={styles.title} variant="ghost" size="medium" borderless asChild>
            <Link href="/new">
              New post
            </Link>
          </Button>
        </PageHeader>
      )}
    >
      <main className={styles.main}>
        {children}
        {auth}
      </main>
    </PageLayout>
  );
};

export default NewPostLayout;
