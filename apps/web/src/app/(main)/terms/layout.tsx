import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { Breadcrumbs, BreadcrumbsItem } from '../../../components/elements/breadcrumbs';
import { createMetadata } from '../../../helpers/create-metadata';
import { PageHeader } from '../_components/page-header';

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
    <ApplicationLayout
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
    </ApplicationLayout>
  );
};

export default TermsOfUseLayout;
