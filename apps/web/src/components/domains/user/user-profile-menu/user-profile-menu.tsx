'use client';

import { MenuIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';

import { useMuteUser } from '../../../../hooks/use-mute-user';
import { useUnmuteUser } from '../../../../hooks/use-unmute-user';
import { AccessibleIcon } from '../../../elements/accessible-icon';
import { Button, ButtonIcon } from '../../../elements/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../elements/dropdown-menu';

import type { FC } from 'react';

export type UserProfileMenuProps = {
  className?: string | undefined;
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
  user,
}) => {
  const handleOnClickMuteUser = useMuteUser({
    muteUserId: user.id,
    muteUserName: user.profile.name,
  });

  const handleOnClickUnmuteUser = useUnmuteUser({
    unmuteUserId: user.id,
    unmuteUserName: user.profile.name,
  });

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
          {user.isMute && (
            <DropdownMenuItem onClick={handleOnClickUnmuteUser}>
              <DropdownMenuIcon>
                <Volume2Icon />
              </DropdownMenuIcon>
              {`Unmute @${user.profile.name}`}
            </DropdownMenuItem>
          )}
          {!user.isMute && (
            <DropdownMenuItem onClick={handleOnClickMuteUser}>
              <DropdownMenuIcon>
                <VolumeXIcon />
              </DropdownMenuIcon>
              {`Mute @${user.profile.name}`}
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
