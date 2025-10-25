import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { createMetadata } from '../../../helpers/create-metadata';

import type { FC } from 'react';

export const metadata = createMetadata({
  title: 'New post',
});

export type NewPostLayoutProps = LayoutProps<'/new'>;

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
