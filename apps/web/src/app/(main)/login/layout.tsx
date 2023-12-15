import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { createMetadata } from '../../../helpers/create-metadata';

import type { LoginPageProps } from './page';
import type { LayoutProps } from '../../../types/layout-props';
import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';

export const metadata: Metadata = createMetadata({
  title: 'Login',
});

export type LoginLayoutProps = LoginPageProps & LayoutProps<{
  header: ReactNode;
}>;

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
