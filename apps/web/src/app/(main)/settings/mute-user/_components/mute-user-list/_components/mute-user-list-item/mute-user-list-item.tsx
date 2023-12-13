'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

import * as styles from './mute-user-list-item.css';
import { AccessibleIcon } from '../../../../../../../_components/accessible-icon';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../../../../_components/avatar';
import { Button, ButtonIcon } from '../../../../../../../_components/button';
import UnmuteIcon from '../../../../../../../_icons/close.svg';

import type { User } from '../../../../../../_repositories/user-repository';
import type { FC } from 'react';

export type MuteUserListItemProps = {
  className?: string | undefined;
  muteUser: User;
};

export const MuteUserListItem: FC<MuteUserListItemProps> = ({
  className,
  muteUser,
}) => {
  const [isMute, setIsMute] = useState(true);
  const hadleOnClickUnmute = () => {
    //TODO:
    setIsMute(false);
  };
  const hadleClickMute = () => {
    //TODO:
    setIsMute(true);
  };

  return (
    <div className={clsx(className, styles.wrapper)}>
      <Link
        href={`/@${muteUser.profile.name}`}
        className={styles.profileWrapper}
      >
        <Avatar className={styles.image}>
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
      {isMute && (
        <Button
          className={styles.actionButton}
          variant="danger"
          onClick={hadleOnClickUnmute}
          size="large"
        >
          <ButtonIcon>
            <AccessibleIcon label="">
              <UnmuteIcon />
            </AccessibleIcon>
          </ButtonIcon>
        </Button>
      )}
      {!isMute && (
        <Button
          className={styles.actionButton}
          variant="normal"
          onClick={hadleClickMute}
          size="large"
        >
          <ButtonIcon>
            <AccessibleIcon label="">
              <UnmuteIcon />
            </AccessibleIcon>
          </ButtonIcon>
        </Button>
      )}
    </div>
  );
};
