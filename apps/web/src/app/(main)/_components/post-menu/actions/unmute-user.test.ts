import { createId } from '@paralleldrive/cuid2';

import { unmuteUserAction } from './unmute-user';
import { deleteMuteUser, saveMuteUser } from '../../../../../repositories/mute-user-repository';
import { saveUserProvider } from '../../../../../repositories/user-provider-repository';
import { saveUser } from '../../../../../repositories/user-repository';
import { getUserMetadata } from '../../../../_libs/auth/server/get-user-metadata';
import { setupDatabase } from '../../../../_libs/test/setup-database';
import { setupWorker } from '../../../../_libs/test/setup-worker';

import type { MuteUserResult } from './mute-user';

jest.mock('@supabase/auth-helpers-nextjs');
jest.mock('../../../../_libs/auth/server/get-user-metadata');
describe('mute-user', () => {
  setupWorker();
  setupDatabase();

  const userId1 = createId();
  const userId2 = createId();

  beforeEach(async () => {
    await saveUser({
      id: userId1,
      profile: {
        avatarUrl: 'avatarUrl',
        name: 'name',
        displayName: 'displayName',
      },
    });
    await saveUser({
      id: userId2,
      profile: {
        avatarUrl: 'avatarUrl',
        name: 'name',
        displayName: 'displayName',
      },
    });
    await saveUserProvider({
      sub: 'sub',
      type: 'github',
      userId: userId1,
    });

    await saveMuteUser({
      userId: userId1,
      muteUserId: userId2,
    });
  });
  describe('when not logged in', () => {
    beforeEach(() => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      jest.mocked(getUserMetadata).mockResolvedValue(undefined);
    });

    it('should be unauthorized.', async () => {
      const result = await unmuteUserAction(userId2);

      expect(result).toEqual({
        type: 'error',
        reason: 'unauthorized',
        message: expect.any(String),
      } satisfies MuteUserResult);
    });
  });
  describe('when logged in', () => {
    beforeEach(() => {
      jest.mocked(getUserMetadata).mockResolvedValue({
        provider: 'github',
        sub: 'sub',
        name: 'name',
        user_name: 'email',
        avatar_url: 'avatar_url',
      });
    });
  
    it('failed: when you try to mute yourself', async () => {
      const result = await unmuteUserAction(userId1);
      expect(result).toEqual({
        type: 'error',
        reason: 'badRequest',
        message: expect.any(String),
      } satisfies MuteUserResult);
    });
  
    it('success: when already muted', async () => {
      const result = await unmuteUserAction(userId2);
      expect(result).toEqual({
        type: 'success',
        message: expect.any(String),
      } satisfies MuteUserResult);
    });
    it('success: when not muted', async () => {
      await deleteMuteUser({
        userId: userId1,
        muteUserId: userId2,
      });
      const result = await unmuteUserAction(userId2);
      expect(result).toEqual({
        type: 'success',
        message: expect.any(String),
      } satisfies MuteUserResult);
    });
  });
});
