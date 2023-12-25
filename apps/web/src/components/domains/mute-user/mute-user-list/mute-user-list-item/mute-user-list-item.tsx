'use client';
import { clsx } from 'clsx';
import Link from 'next/link';

import * as styles from './mute-user-list-item.css';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../elements/avatar';
import { Button } from '../../../../elements/button';

import type { User } from '../../../../../repositories/user-repository';
import type { FC } from 'react';

export type MuteUserListItemProps = {
  className?: string | undefined;
  muteUser: User;
};

export const MuteUserListItem: FC<MuteUserListItemProps> = ({
  className,
  muteUser,
}) => {
  return (
    <div className={clsx(className, styles.wrapper)}>
      <Link
        href={`/@${muteUser.profile.name}`}
        className={styles.profileWrapper}
      >
        <Avatar className={styles.avatar}>
          <AvatarImage
            src={`/images/avatars/${muteUser.id}`}
            alt={muteUser.profile.displayName ?? muteUser.profile.name}
            sizes="64px"
          />
          <AvatarFallback>
            {muteUser.profile.displayName ?? muteUser.profile.name}
          </AvatarFallback>
        </Avatar>
        <div className={styles.nameWrapper}>
          <div className={styles.accountName}>{muteUser.profile.name}</div>
          <div className={styles.displayName}>
            {muteUser.profile.displayName}
          </div>
        </div>
      </Link>
      <Button
        className={styles.unmutedButton}
        onClick={() => console.log('TODO: Implement unmute user feature.')}
        size="large"
      >
        Unmute
      </Button>
    </div>
  );
};
