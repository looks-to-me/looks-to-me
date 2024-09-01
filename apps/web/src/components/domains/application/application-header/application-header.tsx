import { clsx } from 'clsx';

import * as styles from './application-header.css';
import { LoginButton } from '../../../../app/(main)/_components/login-button';
import { NewPostButton } from '../../../../app/(main)/_components/new-post-button';
import { UserAccountMenu } from '../../user/user-account-menu';
import { ApplicationLogo } from '../application-logo';
import { ApplicationNavigation } from '../application-navigation';

import type { UserAccountMenuProps } from '../../user/user-account-menu';
import type { ComponentPropsWithoutRef, FC } from 'react';

export type ApplicationHeaderProps = ComponentPropsWithoutRef<'header'> & {
  user: UserAccountMenuProps['user'] | undefined;
};

export const ApplicationHeader: FC<ApplicationHeaderProps> = ({
  className,
  children,
  user,
  ...props
}) => {
  return (
    <header {...props} className={clsx(className, styles.wrapper)}>
      <ApplicationNavigation />
      <ApplicationLogo className={styles.logo} />
      <div className={styles.container}>
        {children}
      </div>
      <NewPostButton />
      {user
        ? (
            <UserAccountMenu user={user} />
          )
        : (
            <LoginButton />
          )}
    </header>
  );
};
