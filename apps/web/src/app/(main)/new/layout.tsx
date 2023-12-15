import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { Breadcrumbs, BreadcrumbsItem } from '../../../components/elements/breadcrumbs';
import { createMetadata } from '../../../helpers/create-metadata';
import { PageHeader } from '../_components/page-header';

import type { NewPostPageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC, ReactNode } from 'react';

export const metadata = createMetadata({
  title: 'New post',
});

export type NewPostLayoutProps = NewPostPageProps & LayoutProps<{
  auth: ReactNode;
}>;

const NewPostLayout: FC<NewPostLayoutProps> = ({
  children,
  auth,
}) => {
  return (
    <ApplicationLayout
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
    </ApplicationLayout>
  );
};

export default NewPostLayout;
