import Link from 'next/link';

import * as styles from './layout.css';
import { Button } from '../../_components/button';
import { PageHeader } from '../_components/page-header';
import { PageLayout } from '../_components/page-layout';

import type { LoginPageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC } from 'react';

export const metadata = {
  title: 'Login',
  robots: 'noindex',
};

export type LoginLayoutProps = LoginPageProps & LayoutProps<{
  // empty
}>;

const LoginLayout: FC<LoginLayoutProps> = ({
  children,
}) => {
  return (
    <PageLayout
      header={(
        <PageHeader>
          <Button className={styles.title} variant="ghost" size="medium" borderless asChild>
            <Link href="/login">
              Login
            </Link>
          </Button>
        </PageHeader>
      )}
    >
      <main className={styles.main}>
        {children}
      </main>
    </PageLayout>
  );
};

export default LoginLayout;
