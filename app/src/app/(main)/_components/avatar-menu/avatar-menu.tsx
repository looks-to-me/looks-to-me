import clsx from 'clsx';
import Link from 'next/link';

import * as styles from './avatar-menu.css';
import { Avatar, AvatarFallback, AvatarImage } from '../../../_components/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../_components/popover';
import { LogoutButton } from '../logout-button';

import type { User } from '../../_repositories/user-repository';
import type { FC } from 'react';

export type AvatarMenuProps = {
  className?: string;
  user: User;
};

export const AvatarMenu: FC<AvatarMenuProps> = ({
  className,
  user,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className={clsx(className, styles.avatar)}>
          <AvatarImage
            src={`/images/avatars/${user.id}`}
            alt={user.profile.displayName ?? user.profile.name}
            sizes="32px"
          />
          <AvatarFallback>
            {user.profile.displayName ?? user.profile.name}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className={styles.content}>
          <div className={styles.accountInfoArea}>
            <p className={styles.accountName}>{user.profile.name}</p>
            {user.profile.displayName && (
              <p className={styles.displayName}>{user.profile.displayName}</p>
            )}
            <Link href={`/@${user.profile.name}/`}>Your profile</Link>
          </div>
          <div className={styles.buttonArea}>
            <LogoutButton size="medium" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
