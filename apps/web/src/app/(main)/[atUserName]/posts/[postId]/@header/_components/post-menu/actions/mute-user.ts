'use server';

import { getLoginUser } from '../../../../../../../../_actions/get-login-user';
import { findMuteUserByUserIdAndMuteUserId, insertMuteUser } from '../../../../../../../_repositories/mute-user-repository';

export type MuteUserResult = {
  type: 'success';
  message: `@${string} has been muted.`;
} | {
  type: 'error';
  reason: 'unauthorized' | 'badRequest';
  message: string;
};

type muteUserActionProps = {
  muteUserId: string;
};
export const muteUser = async ({ muteUserId }: muteUserActionProps): Promise<MuteUserResult> => {
  const user = await getLoginUser();
  if (!user) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

  const isMe = muteUserId === user.id;
  if (isMe) return { type: 'error', reason: 'badRequest', message: 'Cannot mute yourself!' };

  const muteUser = await findMuteUserByUserIdAndMuteUserId({
    userId: user.id,
    muteUserId,
  });
  const isMuted = !!muteUser;
  if (isMuted) return { type: 'error', reason: 'badRequest', message: 'Already muted!' };

  await insertMuteUser({
    userId: user.id,
    muteUserId,
  });

  return { type: 'success', message: `@${user.profile.name} has been muted.` };
};
