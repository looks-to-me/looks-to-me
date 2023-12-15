import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { Breadcrumbs, BreadcrumbsItem } from '../../../components/elements/breadcrumbs';
import { createMetadata } from '../../../helpers/create-metadata';
import { PageHeader } from '../_components/page-header';

import type { ShufflePageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC, ReactNode } from 'react';

export const metadata = createMetadata({
  title: 'Shuffle',
});

export type ShuffleLayoutProps = ShufflePageProps & LayoutProps<{
  posts: ReactNode;
}>;

const ShuffleLayout: FC<ShuffleLayoutProps> = ({
  children,
  posts,
}) => {
  return (
    <ApplicationLayout
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
    </ApplicationLayout>
  );
};

export default ShuffleLayout;
