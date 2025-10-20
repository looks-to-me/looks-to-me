'use client';

import { SiGithub } from '@icons-pack/react-simple-icons';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import * as styles from './github-login-button.css';
import { ButtonIcon } from '../../../../components/elements/button';
import { dispatch } from '../../../../helpers/dispatch';
import { createClient } from '../../../_libs/auth/client/instance';

import type { MouseEventHandler, ComponentProps, FC } from 'react';

export type LoginButtonProps = ComponentProps<'button'>;

export const GitHubLoginButton: FC<LoginButtonProps> = ({
  className,
  ...props
}) => {
  const router = useRouter();
  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch(async () => {
      await createClient().auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${globalThis.location.origin}/auth/callback`,
        },
      });

      router.refresh();
    })();
  }, [router]);

  return (
    <button {...props} className={clsx(className, styles.button)} onClick={handleClick}>
      <ButtonIcon>
        <SiGithub size="1em" />
      </ButtonIcon>
      Login with GitHub
    </button>
  );
};
