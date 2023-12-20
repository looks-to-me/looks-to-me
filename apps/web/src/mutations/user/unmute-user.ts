'use server';

import { revalidatePath } from 'next/cache';

import { getLoginUser } from '../../queries/user/get-login-user';
import { deleteMuteUser, findMuteUserByUserIdAndMuteUserId } from '../../repositories/mute-user-repository';

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
  if (isMe) return { type: 'error', reason: 'badRequest', message: 'Cannot unmute yourself!' };

  const muteUser = await findMuteUserByUserIdAndMuteUserId(user.id, unmuteUserId);
  const isMuted = !!muteUser;
  if (!isMuted) return { type: 'error', reason: 'badRequest', message: 'Not muted!' };

  await deleteMuteUser({
    userId: user.id,
    muteUserId: unmuteUserId,
  });

  revalidatePath('/');
  revalidatePath('/shuffle');

  return { type: 'success', message: `@${user.profile.name} has been unmuted.` };
};
