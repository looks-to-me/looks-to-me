import { clsx } from 'clsx';
import Link from 'next/link';

import * as styles from './user-account-menu.css';
import LogoutIcon from '../../../../icons/logout.svg';
import PersonIcon from '../../../../icons/person.svg';
import SettingsIcon from '../../../../icons/settings.svg';
import { Avatar, AvatarFallback, AvatarImage } from '../../../elements/avatar';
import {
  DropDownMenu,
  DropDownMenuContent,
  DropDownMenuGroup,
  DropDownMenuTrigger,
  DropDownMenuIcon,
  DropDownMenuItem,
  DropDownMenuLabel,
} from '../../../elements/drop-down-menu';

import type { FC } from 'react';

export type UserAccountMenuProps = {
  className?: string;
  user: {
    id: string;
    profile: {
      name: string;
      displayName: string | null;
    };
  };
};

export const UserAccountMenu: FC<UserAccountMenuProps> = ({
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
            <Link href="/settings">
              <DropDownMenuIcon>
                <SettingsIcon />
              </DropDownMenuIcon>
              Settings
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
