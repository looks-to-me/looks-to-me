'use client';

import { useMuteUser } from '../../../../app/(main)/_components/post-menu/hooks/use-mute-user';
import { useUnmuteUser } from '../../../../hooks/use-unmute-user';
import MenuIcon from '../../../../icons/menu.svg';
import MuteIcon from '../../../../icons/mute.svg';
import UnmuteIcon from '../../../../icons/unmute.svg';
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
            <DropDownMenuItem onClick={handleOnClickUnmuteUser} asChild>
              <Button variant="ghost" borderless>
                <DropDownMenuIcon>
                  <UnmuteIcon />
                </DropDownMenuIcon>
                {`Unmute @${user.profile.name}`}
              </Button>
            </DropDownMenuItem>
          )}
          {!user.isMute && (
            <DropDownMenuItem onClick={handleOnClickMuteUser} asChild>
              <Button variant="ghost" borderless>
                <DropDownMenuIcon>
                  <MuteIcon />
                </DropDownMenuIcon>
                {`Mute @${user.profile.name}`}
              </Button>
            </DropDownMenuItem>
          )}
        </DropDownMenuGroup>
      </DropDownMenuContent>
    </DropDownMenu>
  );
};
