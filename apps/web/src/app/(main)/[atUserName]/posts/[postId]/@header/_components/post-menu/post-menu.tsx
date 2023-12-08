'use client';

import { useDeletePost } from './hooks/use-delete-post';
import { useMuteUser } from './hooks/use-mute-user';
import { useUnmuteUser } from './hooks/use-unmute-user';
import { AccessibleIcon } from '../../../../../../../_components/accessible-icon';
import { Button, ButtonIcon } from '../../../../../../../_components/button';
import { DropDownMenu, DropDownMenuContent, DropDownMenuGroup, DropDownMenuIcon, DropDownMenuItem, DropDownMenuTrigger } from '../../../../../../../_components/drop-down-menu';
import MenuIcon from '../../../../../../../_icons/menu.svg';
import MuteIcon from '../../../../../../../_icons/mute.svg';
import TrashcanIcon from '../../../../../../../_icons/trash-can.svg';
import UnmuteIcon from '../../../../../../../_icons/unmute.svg';

import type { Post } from '../../../../../../_repositories/post-repository';
import type { User } from '../../../../../../_repositories/user-repository';
import type { FC } from 'react';

export type PostMenuProps = {
  className?: string | undefined;
  post: Post;
  postUser: User;
  loginUser: User | undefined;
  isMuteUser: boolean;
};

export const PostMenu: FC<PostMenuProps> = ({
  className,
  post,
  postUser,
  loginUser,
  isMuteUser,
}) => {
  const handleOnClickDeletePost = useDeletePost({ post });
  const handleOnClickMuteUser = useMuteUser({ post, userToMute: postUser });
  const handleOnClickUnuteUser = useUnmuteUser({ post, userToUnmute: postUser });

  const isMyPost = post.userId === loginUser?.id;
  return (
    <DropDownMenu>
      <DropDownMenuTrigger>
        <Button className={className} size="icon">
          <ButtonIcon>
            <AccessibleIcon label="Open post menu">
              <MenuIcon />
            </AccessibleIcon>
          </ButtonIcon>
        </Button>
      </DropDownMenuTrigger>
      <DropDownMenuContent>
        <DropDownMenuGroup>
          {isMyPost && (
            <DropDownMenuItem onClick={handleOnClickDeletePost} asChild>
              <Button variant="ghost" borderless>
                <DropDownMenuIcon>
                  <TrashcanIcon />
                </DropDownMenuIcon>
                Delete
              </Button>
            </DropDownMenuItem>
          )}
          {!isMyPost && isMuteUser && (
            <DropDownMenuItem onClick={handleOnClickUnuteUser} asChild>
              <Button variant="ghost" borderless>
                <DropDownMenuIcon>
                  <UnmuteIcon />
                </DropDownMenuIcon>
                {`Unmute @${postUser.profile.name}`}
              </Button>
            </DropDownMenuItem>
          )}
          {!isMyPost && !isMuteUser && (
            <DropDownMenuItem onClick={handleOnClickMuteUser} asChild>
              <Button variant="ghost" borderless>
                <DropDownMenuIcon>
                  <MuteIcon />
                </DropDownMenuIcon>
                {`Mute @${postUser.profile.name}`}
              </Button>
            </DropDownMenuItem>
          )}

        </DropDownMenuGroup>
      </DropDownMenuContent>
    </DropDownMenu>
  );
};
