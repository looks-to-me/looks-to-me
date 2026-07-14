'use client';

import { R } from '@praha/byethrow';
import { VolumeXIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { muteUser } from './user-mute-menu.action';
import { getFragmentData, graphql } from '../../../../graphql/generated';
import { useAlertDialog } from '../../../elements/alert-dialog';
import { Button } from '../../../elements/button';
import { DropdownMenuIcon, DropdownMenuItem } from '../../../elements/dropdown-menu';

import type { MuteUserError, MuteUserOutput } from './user-mute-menu.action';
import type { FragmentType } from '../../../../graphql/generated';
import type { FC } from 'react';

export const UserMuteMenuFragment = graphql(/** GraphQL */ `
  fragment UserMuteMenu on User {
    id
    name
  }
`);

export type UserMuteMenuProps = {
  fragment: FragmentType<typeof UserMuteMenuFragment>;
};

export const UserMuteMenu: FC<UserMuteMenuProps> = ({
  fragment,
}) => {
  const user = getFragmentData(UserMuteMenuFragment, fragment);

  const router = useRouter();
  const { openAlertDialog } = useAlertDialog();

  const confirm = useCallback(async () => {
    return await openAlertDialog({
      title: `Mute @${user.name}`,
      description: `Are you sure you want to mute @${user.name}?`,
      acceptButton: <Button variant="danger">OK</Button>,
      rejectButton: <Button>Cancel</Button>,
    });
  }, [openAlertDialog, user]);

  const handleClick = useCallback(async () => {
    const isConfirm = await confirm();
    if (!isConfirm) return;

    toast.promise(R.unwrap(muteUser({ userId: user.id })), {
      loading: 'Muting...',
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
      {`Mute @${user.name}`}
    </DropdownMenuItem>
  );
};
