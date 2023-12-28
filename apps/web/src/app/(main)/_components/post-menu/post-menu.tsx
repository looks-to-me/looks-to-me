'use client';

import { MenuIcon, Trash2Icon, Volume2Icon, VolumeXIcon } from 'lucide-react';

import { useDeletePost } from './hooks/use-delete-post';
import { AccessibleIcon } from '../../../../components/elements/accessible-icon';
import { Button, ButtonIcon } from '../../../../components/elements/button';
import { DropDownMenu, DropDownMenuContent, DropDownMenuGroup, DropDownMenuIcon, DropDownMenuItem, DropDownMenuTrigger } from '../../../../components/elements/drop-down-menu';
import { useMuteUser } from '../../../../hooks/use-mute-user';
import { useUnmuteUser } from '../../../../hooks/use-unmute-user';

import type { Post } from '../../../../repositories/post-repository';
import type { User } from '../../../../repositories/user-repository';
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

  const handleOnClickUnmuteUser = useUnmuteUser({
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
            <DropDownMenuItem onClick={handleOnClickDeletePost}>
              <DropDownMenuIcon>
                <Trash2Icon />
              </DropDownMenuIcon>
              Delete
            </DropDownMenuItem>
          )}
          {!isMyPost && isMuteUser && (
            <DropDownMenuItem onClick={handleOnClickUnmuteUser}>
              <DropDownMenuIcon>
                <Volume2Icon />
              </DropDownMenuIcon>
              {`Unmute @${postUser.profile.name}`}
            </DropDownMenuItem>
          )}
          {!isMyPost && !isMuteUser && (
            <DropDownMenuItem onClick={handleOnClickMuteUser}>
              <DropDownMenuIcon>
                <VolumeXIcon />
              </DropDownMenuIcon>
              {`Mute @${postUser.profile.name}`}
            </DropDownMenuItem>
          )}
        </DropDownMenuGroup>
      </DropDownMenuContent>
    </DropDownMenu>
  );
};
