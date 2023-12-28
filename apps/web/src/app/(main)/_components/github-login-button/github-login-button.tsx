'use client';

import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import * as styles from './github-login-button.css';
import { ButtonIcon } from '../../../../components/elements/button';
import { GithubIcon } from '../../../../components/icons/github-icon';
import { supabase } from '../../../_libs/auth/client/instance';

import type { MouseEventHandler, FC, ComponentPropsWithoutRef } from 'react';

export type LoginButtonProps = ComponentPropsWithoutRef<'button'>;

export const GitHubLoginButton: FC<LoginButtonProps> = ({
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
      <ButtonIcon>
        <GithubIcon />
      </ButtonIcon>
      Login with GitHub
    </button>
  );
};
