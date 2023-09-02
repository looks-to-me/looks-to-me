import * as styles from './layout.css';
import { Breadcrumbs, BreadcrumbsItem } from '../../_components/breadcrumbs';
import { generateOpenGraphMetadata } from '../../_helpers/generateOpenGraphMetadata';
import { PageHeader } from '../_components/page-header';
import { PageLayout } from '../_components/page-layout';

import type { HomePageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC, ReactNode } from 'react';

export const metadata = {
  title: {
    absolute: 'LooksToMe',
  },
  robots: 'noindex',
  ...generateOpenGraphMetadata({
    title: {
      absolute: 'LooksToMe',
    },
  }),
};

export type HomeLayoutProps = HomePageProps & LayoutProps<{
  posts: ReactNode;
}>;

const HomeLayout: FC<HomeLayoutProps> = ({
  children,
  posts,
}) => {
  return (
    <PageLayout
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
    </PageLayout>
  );
};

export default HomeLayout;
