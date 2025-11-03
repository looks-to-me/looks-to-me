import { MenuIcon } from 'lucide-react';

import { graphql } from '../../../../graphql/generated';
import { AccessibleIcon } from '../../../elements/accessible-icon';
import { Button, ButtonIcon } from '../../../elements/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from '../../../elements/dropdown-menu';
import { UserMuteMenu } from '../../user/user-mute-menu';
import { UserUnmuteMenu } from '../../user/user-unmute-menu';
import { PostDeleteMenu } from '../post-delete-menu';

import type { ButtonProps } from '../../../elements/button';
import type { FC } from 'react';

export const PostDetailsMenuFragment = graphql(/** GraphQL */ `
  fragment PostDetailsMenu on Post {
    id
    ...PostDeleteMenu
    author {
      ...UserMuteMenu
      ...UserUnmuteMenu
    }
  }
`);

export type PostDetailsMenuProps = Omit<ButtonProps, 'variant' | 'size' | 'children'>;

export const PostDetailsMenu: FC<PostDetailsMenuProps> = ({
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button {...props} variant="normal" size="icon">
          <ButtonIcon>
            <AccessibleIcon label="Open post menu">
              <MenuIcon />
            </AccessibleIcon>
          </ButtonIcon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {isMyPost && <PostDeleteMenu fragment={} />}
          {!isMyPost && isMuteUser && (
            <UserUnmuteMenu fragment={} />
          )}
          {!isMyPost && !isMuteUser && (
            <UserMuteMenu fragment={} />
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
