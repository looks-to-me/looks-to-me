'use client';

import { R } from '@praha/byethrow';
import { VolumeXIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { unmuteUser } from './user-unmute-menu.action';
import { getFragmentData, graphql } from '../../../../graphql/generated';
import { useAlertDialog } from '../../../elements/alert-dialog';
import { Button } from '../../../elements/button';
import { DropdownMenuIcon, DropdownMenuItem } from '../../../elements/dropdown-menu';

import type { FragmentType } from '../../../../graphql/generated';
import type { MuteUserError, MuteUserOutput } from '../user-mute-menu/user-mute-menu.action';
import type { FC } from 'react';

export const UserUnmuteMenuFragment = graphql(/** GraphQL */ `
  fragment UserUnmuteMenu on User {
    id
    name
  }
`);

export type UserUnmuteMenuProps = {
  fragment: FragmentType<typeof UserUnmuteMenuFragment>;
};

export const UserUnmuteMenu: FC<UserUnmuteMenuProps> = ({
  fragment,
}) => {
  const user = getFragmentData(UserUnmuteMenuFragment, fragment);

  const router = useRouter();
  const { openAlertDialog } = useAlertDialog();

  const confirm = useCallback(async () => {
    return await openAlertDialog({
      title: `Unmute @${user.name}`,
      description: `Are you sure you want to unmute @${user.name}?`,
      acceptButton: <Button variant="danger">OK</Button>,
      rejectButton: <Button>Cancel</Button>,
    });
  }, [openAlertDialog, user]);

  const handleClick = useCallback(async () => {
    const isConfirm = await confirm();
    if (!isConfirm) return;

    toast.promise(R.unwrap(unmuteUser({ userId: user.id })), {
      loading: 'Unmuting...',
      success: (output: MuteUserOutput) => output.message,
      error: (error: MuteUserError) => {
        if (error.redirect) router.push(error.redirect);
        return error.message;
      },
    });
  }, [confirm, router, user.id]);

  return (
    <DropdownMenuItem onClick={handleClick}>
      <DropdownMenuIcon>
        <VolumeXIcon />
      </DropdownMenuIcon>
      {`Unmute @${user.name}`}
    </DropdownMenuItem>
  );
};
