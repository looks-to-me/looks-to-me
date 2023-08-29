import { LoginForm } from '../_components/login-form';

import type { FC } from 'react';

export const runtime = 'edge';

export const metadata = {
  title: 'Login',
  robots: 'noindex',
};

const LoginPage: FC = () => {
  return (
    <LoginForm />
  );
};

export default LoginPage;
