import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { Breadcrumbs, BreadcrumbsItem } from '../../../components/elements/breadcrumbs';
import { createMetadata } from '../../../helpers/create-metadata';
import { PageHeader } from '../_components/page-header';

import type { HomePageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC, ReactNode } from 'react';

export const metadata = createMetadata({
  title: {
    absolute: 'LooksToMe',
  },
});

export type HomeLayoutProps = HomePageProps & LayoutProps<{
  posts: ReactNode;
}>;

const HomeLayout: FC<HomeLayoutProps> = ({
  children,
  posts,
}) => {
  return (
    <ApplicationLayout
      header={(
        <PageHeader>
          <Breadcrumbs>
            <BreadcrumbsItem href="/">
              Home
            </BreadcrumbsItem>
          </Breadcrumbs>
        </PageHeader>
      )}
    >
      <main className={styles.main}>
        {posts}
        {children}
      </main>
    </ApplicationLayout>
  );
};

export default HomeLayout;
