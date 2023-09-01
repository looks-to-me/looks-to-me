import { headers } from 'next/headers';

import { LoginDialog } from './_components/login-dialog';

import type { LoginPageProps } from '../../login/page';
import type { FC } from 'react';

export const runtime = 'edge';

export type ModalLoginPageProps = LoginPageProps;

const ModalLoginPage: FC<ModalLoginPageProps> = () => {
  const canGoBack = headers().get('host') === headers().get('referer')?.split('/')[2];

  return (
    <LoginDialog canGoBack={canGoBack} />
  );
};

export default ModalLoginPage;
