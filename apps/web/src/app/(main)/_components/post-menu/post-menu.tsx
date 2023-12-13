'use client';

import { useDeletePost } from './hooks/use-delete-post';
import { useMuteUser } from './hooks/use-mute-user';
import { useUnmuteUser } from './hooks/use-unmute-user';
import { AccessibleIcon } from '../../../../components/elements/accessible-icon';
import { Button, ButtonIcon } from '../../../../components/elements/button';
import { DropDownMenu, DropDownMenuContent, DropDownMenuGroup, DropDownMenuIcon, DropDownMenuItem, DropDownMenuTrigger } from '../../../../components/elements/drop-down-menu';
import MenuIcon from '../../../../icons/menu.svg';
import MuteIcon from '../../../../icons/mute.svg';
import TrashcanIcon from '../../../../icons/trash-can.svg';
import UnmuteIcon from '../../../../icons/unmute.svg';

import type { Post } from '../../_repositories/post-repository';
import type { User } from '../../_repositories/user-repository';
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
  const handleOnClickDeletePost = useDeletePost(post);
  const handleOnClickMuteUser = useMuteUser({
    muteUserId: postUser.id,
    muteUserName: postUser.profile.name,
  });
  const handleOnClickUnuteUser = useUnmuteUser({
    unmuteUserId: postUser.id,
    unmuteUserName: postUser.profile.name,
  });

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
