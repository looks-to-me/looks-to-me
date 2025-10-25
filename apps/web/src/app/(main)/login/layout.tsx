import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { createMetadata } from '../../../helpers/create-metadata';

import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = createMetadata({
  title: 'Login',
});

export type LoginLayoutProps = LayoutProps<'/login'>;

const LoginLayout: FC<LoginLayoutProps> = ({
  children,
  header,
}) => {
  return (
    <ApplicationLayout header={header}>
      <main className={styles.main}>
        {children}
      </main>
    </ApplicationLayout>
  );
};

export default LoginLayout;
