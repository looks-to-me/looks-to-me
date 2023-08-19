'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import * as styles from './login-button.css';
import GitHubWhite from '../../../_icons/github-white.svg';
import { supabase } from '../../../_libs/auth/client/instance';

import type { Button } from '../../../_components/button';
import type { MouseEventHandler, FC, ComponentPropsWithoutRef } from 'react';

type OmitProps = 'variant' | 'borderless' | 'asChild';

export type LoginButtonProps = Omit<ComponentPropsWithoutRef<typeof Button>, OmitProps> & {
  // nothing
};

export const LoginButton: FC<LoginButtonProps> = ({
  className,
  ...props
}) => {
  const router = useRouter();
  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    // TODO: エラーハンドリング
    // const { data: _data, error: _error } =
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    router.refresh();
  }, [router]);

  return (
    <button {...props} className={clsx(className, styles.button)} onClick={handleClick}>
      <GitHubWhite className={styles.icon} />
      Login with GitHub
    </button>
  );
};
