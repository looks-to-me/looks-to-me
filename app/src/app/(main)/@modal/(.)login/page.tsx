import * as styles from './page.css';
import { LoginForm } from '../../_components/login-form';

import type { LoginPageProps } from '../../login/page';
import type { FC } from 'react';

export const runtime = 'edge';

export type ModalLoginPageProps = LoginPageProps;

const ModalLoginPage: FC<ModalLoginPageProps> = () => {
  return (
    <LoginForm className={styles.form} />
  );
};

export default ModalLoginPage;
