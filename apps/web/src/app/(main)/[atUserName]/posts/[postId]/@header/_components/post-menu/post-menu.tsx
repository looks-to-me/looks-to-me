'use client';
import { useDeletePost } from './use-delete-post';
import { AccessibleIcon } from '../../../../../../../_components/accessible-icon';
import { Button, ButtonIcon } from '../../../../../../../_components/button';
import { DropDownMenu, DropDownMenuContent, DropDownMenuGroup, DropDownMenuIcon, DropDownMenuItem, DropDownMenuTrigger } from '../../../../../../../_components/drop-down-menu';
import MenuIcon from '../../../../../../../_icons/menu.svg';
import TrashcanIcon from '../../../../../../../_icons/trash-can.svg';

import type { Post } from '../../../../../../_repositories/post-repository';
import type { FC } from 'react';

export type PostMenuProps = {
  className?: string | undefined;
  post: Post;
};

export const PostMenu: FC<PostMenuProps> = ({
  className,
  post,
}) => {
  const handleOnClickDeletePost = useDeletePost({ post });

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
          <DropDownMenuItem onClick={handleOnClickDeletePost} asChild>
            <Button variant="ghost" borderless>
              <DropDownMenuIcon>
                <TrashcanIcon />
              </DropDownMenuIcon>
              Delete
            </Button>
          </DropDownMenuItem>
        </DropDownMenuGroup>
      </DropDownMenuContent>
    </DropDownMenu>
  );
};
