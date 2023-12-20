'use server';

import { revalidatePath } from 'next/cache';

import { getLoginUser } from '../../queries/user/get-login-user';
import { findMuteUserByUserIdAndMuteUserId, saveMuteUser } from '../../repositories/mute-user-repository';

export type MuteUserResult =
  | {
    type: 'success';
    message: `@${string} has been muted.`;
  }
  | {
    type: 'error';
    reason: 'unauthorized' | 'badRequest';
    message: string;
  };

export const muteUser = async (muteUserId: string): Promise<MuteUserResult> => {
  const user = await getLoginUser();
  if (!user) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

  const isMe = muteUserId === user.id;
  if (isMe) return { type: 'error', reason: 'badRequest', message: 'Cannot mute yourself!' };

  const muteUser = await findMuteUserByUserIdAndMuteUserId(user.id, muteUserId);
  const isMuted = !!muteUser;
  if (isMuted) return { type: 'error', reason: 'badRequest', message: 'Already muted!' };

  await saveMuteUser({
    userId: user.id,
    muteUserId,
  });

  revalidatePath('/');
  revalidatePath('/shuffle');

  return { type: 'success', message: `@${user.profile.name} has been muted.` };
};
