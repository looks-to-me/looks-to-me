import * as styles from './layout.css';
import { Breadcrumbs, BreadcrumbsItem } from '../../_components/breadcrumbs';
import { generateOpenGraphMetadata } from '../../_helpers/generateOpenGraphMetadata';
import { PageHeader } from '../_components/page-header';
import { PageLayout } from '../_components/page-layout';

import type { TermsOfUsePageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC } from 'react';

export const metadata = {
  title: 'Terms of Use',
  ...generateOpenGraphMetadata({
    title: 'Terms of Use',
  }),
};

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
