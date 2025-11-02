'use client';

import { MenuIcon, Trash2Icon, Volume2Icon, VolumeXIcon } from 'lucide-react';

import { useDeletePost } from './hooks/use-delete-post';
import { AccessibleIcon } from '../../../../components/elements/accessible-icon';
import { Button, ButtonIcon } from '../../../../components/elements/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuIcon, DropdownMenuItem, DropdownMenuTrigger } from '../../../../components/elements/dropdown-menu';
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className={className} size="icon">
          <ButtonIcon>
            <AccessibleIcon label="Open post menu">
              <MenuIcon />
            </AccessibleIcon>
          </ButtonIcon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {isMyPost && (
            <DropdownMenuItem onClick={handleOnClickDeletePost}>
              <DropdownMenuIcon>
                <Trash2Icon />
              </DropdownMenuIcon>
              Delete
            </DropdownMenuItem>
          )}
          {!isMyPost && isMuteUser && (
            <DropdownMenuItem onClick={handleOnClickUnmuteUser}>
              <DropdownMenuIcon>
                <Volume2Icon />
              </DropdownMenuIcon>
              {`Unmute @${postUser.profile.name}`}
            </DropdownMenuItem>
          )}
          {!isMyPost && !isMuteUser && (
            <DropdownMenuItem onClick={handleOnClickMuteUser}>
              <DropdownMenuIcon>
                <VolumeXIcon />
              </DropdownMenuIcon>
              {`Mute @${postUser.profile.name}`}
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
