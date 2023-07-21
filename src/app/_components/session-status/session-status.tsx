import { auth } from '../../_libs/next-auth';
import { LoginButton } from '../login-button';
import { LogoutButton } from '../logout-button';

import type { FC } from 'react';

export type SessionStatusProps = {
  className?: string | undefined;
};

/**
 * 動作確認用のコンポーネント
 */
export const SessionStatus: FC<SessionStatusProps> = async ({
  className,
}) => {
  const session = await auth();

  return (
    <div className={className}>
      <p>{session?.user ? 'logged in' : 'logged out'}</p>
      {session?.user ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};
