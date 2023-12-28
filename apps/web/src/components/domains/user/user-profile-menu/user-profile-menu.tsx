'use client';

import { MenuIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';

import { useMuteUser } from '../../../../hooks/use-mute-user';
import { useUnmuteUser } from '../../../../hooks/use-unmute-user';
import { AccessibleIcon } from '../../../elements/accessible-icon';
import { Button, ButtonIcon } from '../../../elements/button';
import {
  DropDownMenu,
  DropDownMenuContent,
  DropDownMenuGroup,
  DropDownMenuIcon,
  DropDownMenuItem,
  DropDownMenuTrigger,
} from '../../../elements/drop-down-menu';

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
    <DropDownMenu>
      <DropDownMenuTrigger>
        <Button className={className} size="icon">
          <ButtonIcon>
            <AccessibleIcon label="Open user profile menu">
              <MenuIcon />
            </AccessibleIcon>
          </ButtonIcon>
        </Button>
      </DropDownMenuTrigger>
      <DropDownMenuContent>
        <DropDownMenuGroup>
          {user.isMute && (
            <DropDownMenuItem onClick={handleOnClickUnmuteUser}>
              <DropDownMenuIcon>
                <Volume2Icon />
              </DropDownMenuIcon>
              {`Unmute @${user.profile.name}`}
            </DropDownMenuItem>
          )}
          {!user.isMute && (
            <DropDownMenuItem onClick={handleOnClickMuteUser}>
              <DropDownMenuIcon>
                <VolumeXIcon />
              </DropDownMenuIcon>
              {`Mute @${user.profile.name}`}
            </DropDownMenuItem>
          )}
        </DropDownMenuGroup>
      </DropDownMenuContent>
    </DropDownMenu>
  );
};
