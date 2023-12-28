'use server';

import { revalidatePath } from 'next/cache';

import { getLoginUser } from '../../queries/user/get-login-user';
import { deleteMuteUser } from '../../repositories/mute-user-repository';
import { findUserById } from '../../repositories/user-repository';

export type UnmuteUserResult =
  | {
    type: 'success';
    message: `@${string} has been unmuted.`;
  } | {
    type: 'error';
    reason: 'unauthorized' | 'badRequest';
    message: string;
  };

export const unmuteUser = async (unmuteUserId: string): Promise<UnmuteUserResult> => {
  const user = await getLoginUser();
  if (!user) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

  const isMe = unmuteUserId === user.id;
  if (isMe) return { type: 'error', reason: 'badRequest', message: 'Can\'t unmute yourself!' };

  const targetUser = await findUserById(unmuteUserId);
  if (!targetUser) return { type: 'error', reason: 'badRequest', message: 'User not found!' };

  await deleteMuteUser({
    userId: user.id,
    muteUserId: targetUser.id,
  });

  revalidatePath('/');
  revalidatePath('/shuffle');

  return { type: 'success', message: `@${targetUser.profile.name} has been unmuted.` };
};
