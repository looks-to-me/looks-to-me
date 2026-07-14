import { clsx } from 'clsx';
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

import * as styles from './user-account-menu.css';
import { getFragmentData, graphql } from '../../../../graphql/generated';
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

import type { FragmentType } from '../../../../graphql/generated';
import type { ComponentProps, FC } from 'react';

export const UserAccountMenuFragment = graphql(/** GraphQL */ `
  fragment UserAccountMenuFragment on User {
    id
    name
    displayName
    avatarUrl
  }
`);

export type UserAccountMenuProps = ComponentProps<typeof Avatar> & {
  fragment: FragmentType<typeof UserAccountMenuFragment>;
};

export const UserAccountMenu: FC<UserAccountMenuProps> = ({
  className,
  fragment,
  ...props
}) => {
  const data = getFragmentData(UserAccountMenuFragment, fragment);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar {...props} className={clsx(styles.avatar, className)}>
          <AvatarImage
            src={data.avatarUrl}
            alt={data.displayName ?? data.name}
            sizes="32px"
          />
          <AvatarFallback>
            {data.displayName ?? data.name}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className={styles.account}>
            <p className={styles.accountName}>{data.name}</p>
            {data.displayName && (
              <p className={styles.displayName}>{data.displayName}</p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/@${data.name}`}>
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
