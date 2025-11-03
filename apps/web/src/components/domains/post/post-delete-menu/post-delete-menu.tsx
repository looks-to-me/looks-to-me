'use client';

import { R } from '@praha/byethrow';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { deletePost } from './post-delete-menu.action';
import { getFragmentData, graphql } from '../../../../graphql/generated';
import { useAlertDialog } from '../../../elements/alert-dialog';
import { Button } from '../../../elements/button';
import { DropdownMenuIcon, DropdownMenuItem } from '../../../elements/dropdown-menu';

import type { DeletePostError, DeletePostOutput } from './post-delete-menu.action';
import type { FragmentType } from '../../../../graphql/generated';
import type { FC } from 'react';

export const PostDeleteMenuFragment = graphql(/** GraphQL */ `
  fragment PostDeleteMenu on Post {
    id
  }
`);

export type PostDeleteMenuProps = {
  fragment: FragmentType<typeof PostDeleteMenuFragment>;
};

export const PostDeleteMenu: FC<PostDeleteMenuProps> = ({
  fragment,
}) => {
  const post = getFragmentData(PostDeleteMenuFragment, fragment);

  const router = useRouter();
  const { openAlertDialog } = useAlertDialog();

  const confirm = useCallback(async () => {
    return await openAlertDialog({
      title: 'Delete Post',
      description: 'Are you sure you want to delete this post?',
      acceptButton: <Button variant="danger">OK</Button>,
      rejectButton: <Button>Cancel</Button>,
    });
  }, [openAlertDialog]);

  const handleClick = useCallback(async () => {
    const isConfirm = await confirm();
    if (!isConfirm) return;

    toast.promise(R.unwrap(deletePost({ postId: post.id })), {
      loading: 'Deleting...',
      success: (output: DeletePostOutput) => {
        router.push(output.redirect);
        return output.message;
      },
      error: (error: DeletePostError) => {
        if (error.redirect) router.push(error.redirect);
        return error.message;
      },
    });
  }, [confirm, post.id, router]);

  return (
    <DropdownMenuItem onClick={handleClick}>
      <DropdownMenuIcon>
        <Trash2Icon />
      </DropdownMenuIcon>
      Delete
    </DropdownMenuItem>
  );
};
