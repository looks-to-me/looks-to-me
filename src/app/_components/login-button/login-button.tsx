'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import * as styles from './login-button.css';
import GitHubBlack from '../../_icons/github-black.svg';
import GitHubWhite from '../../_icons/github-white.svg';
import { supabase } from '../../_libs/auth/client/instance';
import { Button } from '../button';
import { PrefersColorScheme } from '../prefers-color-scheme';

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
    <Button {...props} className={className} variant="primary" onClick={handleClick}>
      <PrefersColorScheme
        className={styles.icon}
        light={<GitHubBlack />}
        dark={<GitHubWhite />}
      />
      Login with GitHub
    </Button>
  );
};
