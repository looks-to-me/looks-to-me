import Link from 'next/link';

import * as styles from './layout.css';
import { Button } from '../../_components/button';
import { PageHeader } from '../_components/page-header';
import { PageLayout } from '../_components/page-layout';

import type { PrivacyPolicyPageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC } from 'react';

export const metadata = {
  title: 'Privacy Policy',
  robots: 'noindex',
};

export type PrivacyPolicyLayoutProps = PrivacyPolicyPageProps & LayoutProps<{
  // empty
}>;

const PrivacyPolicyLayout: FC<PrivacyPolicyLayoutProps> = ({
  children,
}) => {
  return (
    <PageLayout
      header={(
        <PageHeader>
          <Button className={styles.title} variant="ghost" size="medium" borderless asChild>
            <Link href="/privacy">
              Privacy Policy
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

export default PrivacyPolicyLayout;
