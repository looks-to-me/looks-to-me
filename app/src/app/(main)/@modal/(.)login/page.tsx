import { LoginDialog } from './_components/login-dialog';

import type { LoginPageProps } from '../../login/page';
import type { FC } from 'react';

export const runtime = 'edge';

export type ModalLoginPageProps = LoginPageProps;

const ModalLoginPage: FC<ModalLoginPageProps> = () => {
  return (
    <LoginDialog />
  );
};

export default ModalLoginPage;
