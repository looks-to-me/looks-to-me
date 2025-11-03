'use client';

import { MenuIcon } from 'lucide-react';

import { getFragmentData, graphql } from '../../../../graphql/generated';
import { AccessibleIcon } from '../../../elements/accessible-icon';
import { Button, ButtonIcon } from '../../../elements/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from '../../../elements/dropdown-menu';
import { UserMuteMenu } from '../user-mute-menu';
import { UserUnmuteMenu } from '../user-unmute-menu';

import type { FragmentType } from '../../../../graphql/generated';
import type { FC } from 'react';

export const UserProfileMenuFragment = graphql(/** GraphQL */ `
  fragment UserProfileMenu on User {
    id
    ...UserMuteMenu
    ...UserUnmuteMenu
  }
`);

export type UserProfileMenuProps = {
  className?: string | undefined;
  fragment: FragmentType<typeof UserProfileMenuFragment>;
  user: {
    id: string;
    profile: {
      name: string;
    };
    isMute: boolean;
  };
};

export const UserProfileMenu: FC<UserProfileMenuProps> = ({
  className,
  fragment,
  user,
}) => {
  const data = getFragmentData(UserProfileMenuFragment, fragment);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className={className} size="icon">
          <ButtonIcon>
            <AccessibleIcon label="Open user profile menu">
              <MenuIcon />
            </AccessibleIcon>
          </ButtonIcon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {user.isMute ? <UserUnmuteMenu fragment={data} /> : <UserMuteMenu fragment={data} />}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
