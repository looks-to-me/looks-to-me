import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { createMetadata } from '../../../helpers/create-metadata';

import type { FC } from 'react';

export const metadata = createMetadata({
  title: {
    absolute: 'LooksToMe',
  },
});

export type HomeLayoutProps = LayoutProps<'/'>;

const HomeLayout: FC<HomeLayoutProps> = ({
  children,
  header,
  posts,
}) => {
  return (
    <ApplicationLayout header={header}>
      <main className={styles.main}>
        {posts}
        {children}
      </main>
    </ApplicationLayout>
  );
};

export default HomeLayout;
