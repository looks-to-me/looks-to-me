import { clsx } from 'clsx';

import * as styles from './page-header.css';
import { ApplicationLogo } from '../../../../components/domains/application/application-logo';
import { AvatarMenu } from '../avatar-menu';
import { GlobalNavigation } from '../global-navigation';
import { LoginButton } from '../login-button';
import { NewPostButton } from '../new-post-button';

import type { User } from '../../_repositories/user-repository';
import type { ComponentPropsWithoutRef, FC } from 'react';

export type HeaderPresenterProps = ComponentPropsWithoutRef<'header'> & {
  user?: User | undefined;
};

export const PageHeaderPresenter: FC<HeaderPresenterProps> = ({
  className,
  children,
  user,
  ...props
}) => {
  return (
    <header {...props} className={clsx(className, styles.wrapper)}>
      <GlobalNavigation />
      <ApplicationLogo className={styles.logo} />
      <div className={styles.container}>
        {children}
      </div>
      <NewPostButton />
      {user ? (
        <AvatarMenu user={user} />
      ) : (
        <LoginButton />
      )}
    </header>
  );
};
