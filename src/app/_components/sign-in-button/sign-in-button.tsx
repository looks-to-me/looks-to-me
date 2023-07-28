'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { supabase } from '../../_libs/supabase/client-instance';
import { Button } from '../button';

import type { MouseEventHandler, FC } from 'react';

export type SignInButtonProps = {
  className?: string | undefined;
};

export const SignInButton: FC<SignInButtonProps> = ({
  className,
}) => {
  const router = useRouter();
  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    const { data: _data, error: _error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    router.refresh();
  }, [router]);

  return (
    <div className={className}>
      <Button onClick={onClick}>GitHubでログイン</Button>
    </div>
  );
};
