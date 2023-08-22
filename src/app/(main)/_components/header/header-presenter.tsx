import clsx from 'clsx';

import * as styles from './header.css';
import { GitHubLoginButton } from '../github-login-button';
import { GlobalNavigation } from '../global-navigation';
import { Logo } from '../logo';
import { LogoutButton } from '../logout-button';

import type { AuthUser } from '../../../_libs/auth/type/auth-user';
import type { ComponentPropsWithoutRef, FC } from 'react';

export type HeaderPresenterProps = ComponentPropsWithoutRef<'header'> & {
  authUser?: AuthUser | undefined;
};

export const HeaderPresenter: FC<HeaderPresenterProps> = ({
  className,
  children,
  authUser,
  ...props
}) => {
  return (
    <header {...props} className={clsx(className, styles.wrapper)}>
      <GlobalNavigation />
      <Logo />
      <div className={styles.container}>
        {children}
      </div>
      {authUser ? <LogoutButton size="medium" /> : <GitHubLoginButton />}
    </header>
  );
};
