import * as styles from './layout.css';
import { Breadcrumbs, BreadcrumbsItem } from '../../../components/elements/breadcrumbs';
import { createMetadata } from '../../_helpers/create-metadata';
import { PageHeader } from '../_components/page-header';
import { PageLayout } from '../_components/page-layout';

import type { TermsOfUsePageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC } from 'react';

export const metadata = createMetadata({
  title: 'Terms of Use',
});

export type TermsOfUseLayoutProps = TermsOfUsePageProps & LayoutProps<{
  // empty
}>;

const TermsOfUseLayout: FC<TermsOfUseLayoutProps> = ({
  children,
}) => {
  return (
    <PageLayout
      header={(
        <PageHeader>
          <Breadcrumbs>
            <BreadcrumbsItem href="/terms">
              Terms of Use
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

export default TermsOfUseLayout;
