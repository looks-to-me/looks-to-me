import { LoginForm } from '../_components/login-form';

import type { PageProps } from '../../../types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type LoginPageProps = PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const LoginPage: FC<LoginPageProps> = () => {
  return (
    <LoginForm />
  );
};

export default LoginPage;
