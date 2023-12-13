'use server';

import { revalidatePath } from 'next/cache';

import { getLoginUser } from '../../../../_actions/get-login-user';
import { deleteMuteUser } from '../../../_repositories/mute-user-repository';

export type UnmuteUserResult = {
  type: 'success';
  message: `@${string} has been unmuted.`;
} | {
  type: 'error';
  reason: 'unauthorized' | 'badRequest';
  message: string;
};

type UnmuteUserActionProps = {
  unmuteUserId: string;
};

export const unmuteUserAction = async ({ unmuteUserId }: UnmuteUserActionProps): Promise<UnmuteUserResult> => {
  const user = await getLoginUser();
  if (!user) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

  const isMe = unmuteUserId === user.id;
  if (isMe) return { type: 'error', reason: 'badRequest', message: 'Cannot unmute yourself!' };

  const result = await deleteMuteUser({
    userId: user.id,
    muteUserId: unmuteUserId,
  });

  if (!result) return { type: 'error', reason: 'badRequest', message: 'Not muted!' };
  
  revalidatePath('/');
  revalidatePath('/shuffle');

  return { type: 'success', message: `@${user.profile.name} has been unmuted.` };
};
