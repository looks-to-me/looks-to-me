import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import * as styles from './header.css';
import { Button } from '../../../_components/button';
import { Dialog } from '../../../_components/dialog';
import { DialogContent } from '../../../_components/dialog/dialog-content';
import { DialogTrigger } from '../../../_components/dialog/dialog-trigger';
import { Popover, PopoverContent, PopoverTrigger } from '../../../_components/popover';
import { GitHubLoginButton } from '../github-login-button';
import { GlobalNavigation } from '../global-navigation';
import { Logo } from '../logo';
import { LogoutButton } from '../logout-button';

import type { AuthUser } from '../../../_libs/auth/type/auth-user';
import type { Route } from 'next';
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
      <AuthControl authUser={authUser} />
    </header>
  );
};

type AuthControlProps = {
  authUser?: AuthUser | undefined;
};
const AuthControl: FC<AuthControlProps> = ({ authUser }) => {
  return authUser ? (
    <Popover>
      <PopoverTrigger>
        <Image
          src={authUser.avatarUrl}
          alt={authUser.displayName ?? authUser.id}
          width={32}
          height={32}
          className={styles.userAvatar}
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className={styles.popover}>
          <div className={styles.accountInfoArea}>
            <p className={styles.accountName}>{authUser.accountName}</p>
            {authUser.displayName && (
              <p className={styles.displayName}>{authUser.displayName}</p>
            )}
            {/* FIXME: as消したい */}
            <Link href={`/%40${authUser.accountName}/` as Route}>Your profile</Link>
          </div>
          <div className={styles.popoverButtonArea}>
            <LogoutButton size="medium" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <Dialog>
      <DialogTrigger>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <div className={styles.dialog}>
          {/* TODO: いいねできるようになったら、それも書く */}
          <p>Login to be able to post images.</p>
          <div className={styles.dialogButtonArea}>
            <GitHubLoginButton />
          </div>
          {/* TODO: "terms of use and privacy policy"をリンクにする */}
          <p className={styles.dialogAnnotation}>Please login after agreeing to the terms of use and privacy policy.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
