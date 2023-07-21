'use client'

import clsx from 'clsx';

import * as styles from './sign-in-button.css';

import { useCallback, type FC, MouseEventHandler } from 'react';
import { Button } from '../button';
import { useRouter } from 'next/navigation'
import { supabase } from '../../_libs/supabase/client-instance';

export type SignInButtonProps = {
  className?: string | undefined;
};

export const SignInButton: FC<SignInButtonProps> = ({
  className,
}) => {
  const router = useRouter()
  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    const {data: _data, error: _error} = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    router.refresh()
  }, [])

  return (
    <div className={clsx(className, styles.wrapper)}>
      <Button onClick={onClick}>GitHubでログイン</Button>
    </div>
  );
};
