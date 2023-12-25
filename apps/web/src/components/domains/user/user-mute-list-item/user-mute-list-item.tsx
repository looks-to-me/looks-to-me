'use client';
import { clsx } from 'clsx';
import Link from 'next/link';

import * as styles from './user-mute-list-item.css';
import UnmuteIcon from '../../../../icons/unmute.svg';
import { Avatar, AvatarFallback, AvatarImage } from '../../../elements/avatar';
import { Button, ButtonIcon } from '../../../elements/button';

import type { User } from '../../../../repositories/user-repository';
import type { FC } from 'react';

export type MuteUserListItemProps = {
  className?: string | undefined;
  user: User;
};

export const UserMuteListItem: FC<MuteUserListItemProps> = ({
  className,
  user,
}) => {
  return (
    <li className={clsx(className, styles.wrapper)}>
      <Link
        href={`/@${user.profile.name}`}
        className={styles.profileWrapper}
      >
        <Avatar className={styles.avatar}>
          <AvatarImage
            src={`/images/avatars/${user.id}`}
            alt={user.profile.displayName ?? user.profile.name}
            sizes="64px"
          />
          <AvatarFallback>
            {user.profile.displayName ?? user.profile.name}
          </AvatarFallback>
        </Avatar>
        <div className={styles.nameWrapper}>
          <div className={styles.accountName}>{user.profile.name}</div>
          <div className={styles.displayName}>
            {user.profile.displayName}
          </div>
        </div>
      </Link>
      <Button
        className={styles.unmutedButton}
        onClick={() => console.log('TODO: Implement unmute user feature.')}
        size="medium"
      >
        <ButtonIcon>
          <UnmuteIcon />
        </ButtonIcon>
        Unmute
      </Button>
    </li>
  );
};