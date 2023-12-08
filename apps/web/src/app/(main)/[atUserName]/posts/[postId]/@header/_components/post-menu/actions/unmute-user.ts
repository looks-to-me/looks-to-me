'use server';

import { getLoginUser } from '../../../../../../../../_actions/get-login-user';
import { deleteMuteUser, findMuteUserByUserIdAndMuteUserId } from '../../../../../../../_repositories/mute-user-repository';

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
export const unmuteUser = async ({ unmuteUserId }: UnmuteUserActionProps): Promise<UnmuteUserResult> => {
  const user = await getLoginUser();
  if (!user) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

  const isMe = unmuteUserId === user.id;
  if (isMe) return { type: 'error', reason: 'badRequest', message: 'Cannot unmute yourself!' };

  const muteUser = await findMuteUserByUserIdAndMuteUserId({
    userId: user.id,
    muteUserId: unmuteUserId,
  });
  if (!muteUser) return { type: 'error', reason: 'badRequest', message: 'Not muted!' };

  await deleteMuteUser({
    userId: user.id,
    muteUserId: unmuteUserId,
  });

  return { type: 'success', message: `@${user.profile.name} has been unmuted.` };
};
