import * as styles from './layout.css';
import { Breadcrumbs, BreadcrumbsItem } from '../../_components/breadcrumbs';
import { generateOpenGraphMetadata } from '../../_helpers/generateOpenGraphMetadata';
import { PageHeader } from '../_components/page-header';
import { PageLayout } from '../_components/page-layout';

import type { ShufflePageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC, ReactNode } from 'react';

export const metadata = {
  title: 'Shuffle',
  robots: 'noindex',
  ...generateOpenGraphMetadata({
    title: 'Shuffle',
  }),
};

export type ShuffleLayoutProps = ShufflePageProps & LayoutProps<{
  posts: ReactNode;
}>;

const ShuffleLayout: FC<ShuffleLayoutProps> = ({
  children,
  posts,
}) => {
  return (
    <PageLayout
      header={(
        <PageHeader>
          <Breadcrumbs>
            <BreadcrumbsItem href="/shuffle">
              Shuffle
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

export default ShuffleLayout;
