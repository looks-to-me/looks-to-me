import * as styles from './layout.css';
import { Breadcrumbs, BreadcrumbsItem } from '../../../components/elements/breadcrumbs';
import { createMetadata } from '../../../helpers/create-metadata';
import { PageHeader } from '../_components/page-header';
import { PageLayout } from '../_components/page-layout';

import type { LoginPageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = createMetadata({
  title: 'Login',
});

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
          <Breadcrumbs>
            <BreadcrumbsItem href="/login">
              Login
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

export default LoginLayout;
