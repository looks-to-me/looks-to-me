'use server';

import { getLoginUser } from '../../../../../queries/user/get-login-user';
import { saveMuteUser } from '../../../../../repositories/mute-user-repository';

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

type MuteUserActionProps = {
  muteUserId: string;
};

export const muteUserAction = async ({
  muteUserId,
}: MuteUserActionProps): Promise<MuteUserResult> => {
  const user = await getLoginUser();
  if (!user) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

  const isMe = muteUserId === user.id;
  if (isMe) return { type: 'error', reason: 'badRequest', message: 'Cannot mute yourself!' };

  await saveMuteUser({
    userId: user.id,
    muteUserId,
  });

  return { type: 'success', message: `@${user.profile.name} has been muted.` };
};
