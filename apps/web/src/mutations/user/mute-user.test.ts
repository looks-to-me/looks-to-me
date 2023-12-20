import { createId } from '@paralleldrive/cuid2';

import { muteUser } from './mute-user';
import { getUserMetadata } from '../../app/_libs/auth/server/get-user-metadata';
import { setupDatabase } from '../../app/_libs/test/setup-database';
import { setupWorker } from '../../app/_libs/test/setup-worker';
import { saveUserProvider } from '../../repositories/user-provider-repository';
import { saveUser } from '../../repositories/user-repository';

import type { MuteUserResult } from './mute-user';

jest.mock('next/cache');
jest.mock('@supabase/auth-helpers-nextjs');
jest.mock('../../app/_libs/auth/server/get-user-metadata');

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
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      jest.mocked(getUserMetadata).mockResolvedValue(undefined);
    });

    it('should return error if unauthorized', async () => {
      const result = await muteUser(userId2);

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
  
    it('should return error if try to mute yourself', async () => {
      const result = await muteUser(userId1);

      expect(result).toEqual({
        type: 'error',
        reason: 'badRequest',
        message: expect.any(String),
      } satisfies MuteUserResult);
    });

    it('should return error if try to mute already muted user', async () => {
      await muteUser(userId2);

      const result = await muteUser(userId2);

      expect(result).toEqual({
        type: 'error',
        reason: 'badRequest',
        message: expect.any(String),
      } satisfies MuteUserResult);
    });
    
    it('should return success if try to mute someone else', async () => {
      const result = await muteUser(userId2);

      expect(result).toEqual({
        type: 'success',
        message: expect.any(String),
      } satisfies MuteUserResult);
    });
  });
});
