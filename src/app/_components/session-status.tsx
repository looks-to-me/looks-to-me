import { getServerSession } from 'next-auth';

import { LoginButton } from './login-button';
import { LogoutButton } from './logout-button';

import type { FC } from 'react';

/**
 * 動作確認用のコンポーネント
 */
export const SessionStatus: FC = async () => {
  const session = await getServerSession();

  return (
    <div>
      <p>{session ? 'logged in' : 'logged out'}</p>
      {session ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};
