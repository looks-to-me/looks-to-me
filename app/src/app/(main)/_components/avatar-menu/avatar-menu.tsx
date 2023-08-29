import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import * as styles from './avatar-menu.css';
import { Popover, PopoverContent, PopoverTrigger } from '../../../_components/popover';
import { LogoutButton } from '../logout-button';

import type { UserEntity } from '../../_repositories/user-repository';
import type { FC } from 'react';

export type AvatarMenuProps = {
  className?: string;
  user: UserEntity;
};

export const AvatarMenu: FC<AvatarMenuProps> = ({
  className,
  user,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          className={clsx(className, styles.avatar)}
          src={`/images/avatars/${user.id}`}
          alt={user.profile.displayName ?? user.profile.name}
          width={32}
          height={32}
        />
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
