import { useSignIn } from '@clerk/nextjs';
import clsx from 'clsx';
import { useCallback } from 'react';

import * as styles from './sign-in-button.css';
import { Button } from '../button';

import type { MouseEventHandler, FC } from 'react';

export type SignInButtonProps = {
  className?: string | undefined;
};

export const SignInButton: FC<SignInButtonProps> = ({
  className,
}) => {
  const { signIn } = useSignIn();

  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async (event) => {
    event.preventDefault();

    try {
      if (signIn) {
        await signIn.authenticateWithRedirect({
          strategy: 'oauth_github',
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/',
        });
      }
    } catch (error) {
      console.error({ error });
    }
  }, [signIn]);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <Button onClick={onClick}>Sign In</Button>
    </div>
  );
};
