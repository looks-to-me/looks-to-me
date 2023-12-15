import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { createMetadata } from '../../../helpers/create-metadata';

import type { NewPostPageProps } from './page';
import type { LayoutProps } from '../../../types/layout-props';
import type { FC, ReactNode } from 'react';

export const metadata = createMetadata({
  title: 'New post',
});

export type NewPostLayoutProps = NewPostPageProps & LayoutProps<{
  auth: ReactNode;
  header: ReactNode;
}>;

const NewPostLayout: FC<NewPostLayoutProps> = ({
  children,
  auth,
  header,
}) => {
  return (
    <ApplicationLayout header={header}>
      <main className={styles.main}>
        {children}
        {auth}
      </main>
    </ApplicationLayout>
  );
};

export default NewPostLayout;
