import { headers } from 'next/headers';

import { LoginDialog } from './_components/login-dialog';

import type { PageProps } from '../../../_types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type AuthLoginPageProps = PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const AuthLoginPage: FC<AuthLoginPageProps> = () => {
  const canGoBack = headers().get('host') === headers().get('referer')?.split('/')[2];

  return (
    <LoginDialog canGoBack={canGoBack} />
  );
};

export default AuthLoginPage;
