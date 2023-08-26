import Image from 'next/image';
import Link from 'next/link';

import * as styles from './avatar-menu.css';
import { Popover, PopoverContent, PopoverTrigger } from '../../../_components/popover';
import { LogoutButton } from '../logout-button';

import type { UserMetadata } from '../../../_libs/auth/type/user-metadata';
import type { FC } from 'react';

export type AvatarMenuProps = {
  userMetadata: UserMetadata;
};

export const AvatarMenu: FC<AvatarMenuProps> = ({
  userMetadata,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          className={styles.avatar}
          src={userMetadata.avatar_url}
          alt={userMetadata.name ?? userMetadata.user_name}
          width={32}
          height={32}
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className={styles.content}>
          <div className={styles.accountInfoArea}>
            <p className={styles.accountName}>{userMetadata.user_name}</p>
            {userMetadata.name && (
              <p className={styles.displayName}>{userMetadata.name}</p>
            )}
            <Link href={`/@${userMetadata.user_name}/`}>Your profile</Link>
          </div>
          <div className={styles.buttonArea}>
            <LogoutButton size="medium" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
