import { headers } from 'next/headers';

import { LoginDialog } from './_components/login-dialog';

import type { FC } from 'react';

export const runtime = 'edge';

const AuthLoginPage: FC = () => {
  const canGoBack = headers().get('host') === headers().get('referer')?.split('/')[2];

  return (
    <LoginDialog canGoBack={canGoBack} />
  );
};

export default AuthLoginPage;
