'use server';

import { getLoginUser } from '../../../../../queries/user/get-login-user';
import { deleteMuteUser } from '../../../../../repositories/mute-user-repository';

export type UnmuteUserResult = {
  type: 'success';
  message: `@${string} has been unmuted.`;
} | {
  type: 'error';
  reason: 'unauthorized' | 'badRequest';
  message: string;
};

export const unmuteUserAction = async (unmuteUserId: string): Promise<UnmuteUserResult> => {
  const user = await getLoginUser();
  if (!user) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

  const isMe = unmuteUserId === user.id;
  if (isMe) return { type: 'error', reason: 'badRequest', message: 'Cannot unmute yourself!' };

  await deleteMuteUser({
    userId: user.id,
    muteUserId: unmuteUserId,
  });

  return { type: 'success', message: `@${user.profile.name} has been unmuted.` };
};
