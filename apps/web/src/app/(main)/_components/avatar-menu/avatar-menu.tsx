import { clsx } from 'clsx';
import Link from 'next/link';

import * as styles from './avatar-menu.css';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/elements/avatar';
import {
  DropDownMenu,
  DropDownMenuContent,
  DropDownMenuGroup,
  DropDownMenuTrigger,
  DropDownMenuIcon,
  DropDownMenuItem,
  DropDownMenuLabel,
} from '../../../../components/elements/drop-down-menu';
import LogoutIcon from '../../../../icons/logout.svg';
import PersonIcon from '../../../../icons/person.svg';

import type { User } from '../../../../repositories/user-repository';
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
    <DropDownMenu>
      <DropDownMenuTrigger>
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
      </DropDownMenuTrigger>
      <DropDownMenuContent>
        <DropDownMenuLabel>
          <div className={styles.account}>
            <p className={styles.accountName}>{user.profile.name}</p>
            {user.profile.displayName && (
              <p className={styles.displayName}>{user.profile.displayName}</p>
            )}
          </div>
        </DropDownMenuLabel>
        <DropDownMenuGroup>
          <DropDownMenuItem asChild>
            <Link href={`/@${user.profile.name}`}>
              <DropDownMenuIcon>
                <PersonIcon />
              </DropDownMenuIcon>
              Your profile
            </Link>
          </DropDownMenuItem>
          <DropDownMenuItem asChild>
            <Link href="/logout">
              <DropDownMenuIcon>
                <LogoutIcon />
              </DropDownMenuIcon>
              Logout
            </Link>
          </DropDownMenuItem>
        </DropDownMenuGroup>
      </DropDownMenuContent>
    </DropDownMenu>
  );
};
