import Link from 'next/link';

import * as styles from './layout.css';
import { Button } from '../../_components/button';
import { Header } from '../_components/header';
import { PageLayout } from '../_components/page-layout';

import type { FC, ReactNode } from 'react';

export const metadata = {
  title: 'Privacy Policy',
  robots: 'noindex',
};

export type PrivacyPolicyLayoutProps = {
  children: ReactNode;
};

const PrivacyPolicyLayout: FC<PrivacyPolicyLayoutProps> = ({
  children,
}) => {
  return (
    <PageLayout
      header={(
        <Header>
          <Button className={styles.title} variant="ghost" size="medium" borderless asChild>
            <Link href="/privacy">
              Privacy Policy
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

export default PrivacyPolicyLayout;
