import * as styles from './layout.css';
import { Breadcrumbs, BreadcrumbsItem } from '../../_components/breadcrumbs';
import { PageHeader } from '../_components/page-header';
import { PageLayout } from '../_components/page-layout';

import type { NewPostPageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC, ReactNode } from 'react';

export const metadata = {
  title: 'New post',
  robots: 'noindex',
};

export type NewPostLayoutProps = NewPostPageProps & LayoutProps<{
  auth: ReactNode;
}>;

const NewPostLayout: FC<NewPostLayoutProps> = ({
  children,
  auth,
}) => {
  return (
    <PageLayout
      header={(
        <PageHeader>
          <Breadcrumbs>
            <BreadcrumbsItem href="/new">
              New post
            </BreadcrumbsItem>
          </Breadcrumbs>
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
