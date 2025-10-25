import { LoginForm } from '../_components/login-form';

import type { FC } from 'react';

export type LoginPageProps = PageProps<'/login'>;

const LoginPage: FC<LoginPageProps> = () => {
  return (
    <LoginForm />
  );
};

export default LoginPage;
