import { LoginButton } from './login-button';
import { LogoutButton } from './logout-button';
import { auth } from '../_libs/next-auth';

import type { FC } from 'react';

/**
 * 動作確認用のコンポーネント
 */
export const SessionStatus: FC = async () => {
  const session = await auth();

  return (
    <div>
      <p>{session ? 'logged in' : 'logged out'}</p>
      {session ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};
