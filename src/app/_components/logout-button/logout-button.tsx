'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { supabase } from '../../_libs/auth/client/instance';
import { Button } from '../button';

import type { MouseEventHandler, FC } from 'react';

export type LogoutButtonProps = {
  className?: string | undefined;
};

export const LogoutButton: FC<LogoutButtonProps> = ({
  className,
}) => {
  const router = useRouter();
  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    // TODO: エラーハンドリング
    // const { error: _error } =
    await supabase.auth.signOut();

    router.refresh();
  }, [router]);

  return (
    <div className={className}>
      <Button onClick={onClick}>ログアウト</Button>
    </div>
  );
};
