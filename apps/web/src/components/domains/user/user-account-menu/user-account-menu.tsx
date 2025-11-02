import { clsx } from 'clsx';
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

import * as styles from './user-account-menu.css';
import { Avatar, AvatarFallback, AvatarImage } from '../../../elements/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '../../../elements/dropdown-menu';

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
    <DropdownMenu>
      <DropdownMenuTrigger>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className={styles.account}>
            <p className={styles.accountName}>{user.profile.name}</p>
            {user.profile.displayName && (
              <p className={styles.displayName}>{user.profile.displayName}</p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/@${user.profile.name}`}>
              <DropdownMenuIcon>
                <UserIcon />
              </DropdownMenuIcon>
              Your profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <DropdownMenuIcon>
                <SettingsIcon />
              </DropdownMenuIcon>
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/logout">
              <DropdownMenuIcon>
                <LogOutIcon />
              </DropdownMenuIcon>
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
