import Link from 'next/link';

import * as styles from './layout.css';
import { Button } from '../../_components/button';
import { Header } from '../_components/header';
import { PageLayout } from '../_components/page-layout';

import type { FC, ReactNode } from 'react';

export const metadata = {
  title: 'Login',
  robots: 'noindex',
};

export type LoginLayoutProps = {
  children: ReactNode;
};

const LoginLayout: FC<LoginLayoutProps> = ({
  children,
}) => {
  return (
    <PageLayout
      header={(
        <Header>
          <Button className={styles.title} variant="ghost" size="medium" borderless asChild>
            <Link href="/login">
              Login
            </Link>
          </Button>
        </Header>
      )}
    >
      <main className={styles.main}>
        {children}
      </main>
    </PageLayout>
  );
};

export default LoginLayout;
