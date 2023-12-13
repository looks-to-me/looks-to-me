import * as styles from './layout.css';
import { Breadcrumbs, BreadcrumbsItem } from '../../../components/elements/breadcrumbs';
import { createMetadata } from '../../_helpers/create-metadata';
import { PageHeader } from '../_components/page-header';
import { PageLayout } from '../_components/page-layout';

import type { PrivacyPolicyPageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC } from 'react';

export const metadata = createMetadata({
  title: 'Privacy Policy',
});

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
          <Breadcrumbs>
            <BreadcrumbsItem href="/privacy">
              Privacy Policy
            </BreadcrumbsItem>
          </Breadcrumbs>
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
