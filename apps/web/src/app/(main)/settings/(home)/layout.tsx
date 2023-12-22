import * as styles from './layout.css';
import { ApplicationLayout } from '../../../../components/domains/application/application-layout';
import { createMetadata } from '../../../../helpers/create-metadata';

import type { SettingsPageProps } from './page';
import type { LayoutProps } from '../../../../types/layout-props';
import type { FC, ReactNode } from 'react';

export const metadata = createMetadata({
  title: 'Settings',
});

export type SettingsLayoutProps = SettingsPageProps & LayoutProps<{
  header: ReactNode;
  main: ReactNode;
}>;

const HomeLayout: FC<SettingsLayoutProps> = ({
  children,
  header,
  main,
}) => {
  return (
    <ApplicationLayout header={header}>
      <main className={styles.main}>
        {main}
        {children}
      </main>
    </ApplicationLayout>
  );
};

export default HomeLayout;
