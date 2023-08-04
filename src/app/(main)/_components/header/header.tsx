import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from './header.css';
import { GlobalNavigation } from '../global-navigation';
import { LoginButton } from '../login-button';
import { Logo } from '../logo';
import { LogoutButton } from '../logout-button';

import type { AuthUser } from '../../../_libs/auth/type/auth-user';
import type { ForwardRefRenderFunction , ComponentPropsWithoutRef } from 'react';

export type HeaderProps = ComponentPropsWithoutRef<'header'> & {
  authUser?: AuthUser | undefined;
};

const HeaderRender: ForwardRefRenderFunction<HTMLElement, HeaderProps> = ({
  className,
  children,
  authUser,
  ...props
}, ref) => {
  return (
    <header {...props} ref={ref} className={clsx(className, styles.wrapper)}>
      <GlobalNavigation />
      <Logo />
      <div className={styles.container}>
        {children}
      </div>
      {authUser ? <LogoutButton size="medium" /> : <LoginButton size="medium" />}
    </header>
  );
};

export const Header = forwardRef(HeaderRender);
