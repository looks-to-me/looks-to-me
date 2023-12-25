import * as styles from './layout.css';
import { ApplicationLayout } from '../../../../components/domains/application/application-layout';
import { createMetadata } from '../../../../helpers/create-metadata';

import type { SettingsHomePageProps } from './page';
import type { LayoutProps } from '../../../../types/layout-props';
import type { FC, ReactNode } from 'react';

export const metadata = createMetadata({
  title: 'Settings',
});

export type SettingsHomeLayoutProps = SettingsHomePageProps & LayoutProps<{
  header: ReactNode;
  main: ReactNode;
}>;

const SettingsHomeLayout: FC<SettingsHomeLayoutProps> = ({
  children,
  header,
  main,
}) => {
  return (
    <ApplicationLayout header={header}>
      <main className={styles.wrapper}>
        {main}
        {children}
      </main>
    </ApplicationLayout>
  );
};

export default SettingsHomeLayout;
