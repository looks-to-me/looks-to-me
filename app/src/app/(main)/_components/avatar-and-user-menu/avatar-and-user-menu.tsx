import Image from 'next/image';
import Link from 'next/link';

import * as styles from './avatar-and-user-menu.css';
import { Popover, PopoverContent, PopoverTrigger } from '../../../_components/popover';
import { LogoutButton } from '../logout-button';

import type { AuthUser } from '../../../_libs/auth/type/auth-user';
import type { Route } from 'next';
import type { FC } from 'react';

export type AvatarAndUserMenuProps = {
  authUser: AuthUser;
};

export const AvatarAndUserMenu: FC<AvatarAndUserMenuProps> = ({
  authUser,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={authUser.avatarUrl}
          alt={authUser.displayName ?? authUser.id}
          width={32}
          height={32}
          className={styles.avatar}
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className={styles.content}>
          <div className={styles.accountInfoArea}>
            <p className={styles.accountName}>{authUser.accountName}</p>
            {authUser.displayName && (
              <p className={styles.displayName}>{authUser.displayName}</p>
            )}
            {/* FIXME: as消したい */}
            <Link href={`/%40${authUser.accountName}/` as Route}>Your profile</Link>
          </div>
          <div className={styles.buttonArea}>
            <LogoutButton size="medium" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
