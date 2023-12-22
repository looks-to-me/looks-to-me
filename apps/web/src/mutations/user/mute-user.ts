'use server';

import { revalidatePath } from 'next/cache';

import { getLoginUser } from '../../queries/user/get-login-user';
import { saveMuteUser } from '../../repositories/mute-user-repository';
import { findUserById } from '../../repositories/user-repository';

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
  if (isMe) return { type: 'error', reason: 'badRequest', message: 'Can\'t mute yourself!' };

  const targetUser = await findUserById(muteUserId);
  if (!targetUser) return { type: 'error', reason: 'badRequest', message: 'User not found!' };

  await saveMuteUser({
    userId: user.id,
    muteUserId: targetUser.id,
  });

  revalidatePath('/');
  revalidatePath('/shuffle');

  return { type: 'success', message: `@${targetUser.profile.name} has been muted.` };
};
