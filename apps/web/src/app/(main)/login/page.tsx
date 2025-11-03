import * as styles from './page.css';
import { createMetadata } from '../../../helpers/create-metadata';
import { LoginForm } from '../_components/login-form';

import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = createMetadata({
  title: 'Login',
});

export type LoginPageProps = PageProps<'/login'>;

const LoginPage: FC<LoginPageProps> = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
