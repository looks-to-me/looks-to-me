'use client';

import { useSignUp } from '@clerk/nextjs';
import clsx from 'clsx';
import { useCallback } from 'react';

import * as styles from './sign-up-button.css';
import { Button } from '../button';

import type { MouseEventHandler, FC } from 'react';

export type SignUpButtonProps = {
  className?: string | undefined;
};

export const SignUpButton: FC<SignUpButtonProps> = ({
  className,
}) => {
  const { signUp } = useSignUp();

  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async (event) => {
    event.preventDefault();

    try {
      if (signUp) {
        await signUp.authenticateWithRedirect({
          strategy: 'oauth_github',
          redirectUrl: '/',
          redirectUrlComplete: '/',
        });
      }
    } catch (error) {
      console.error({ error });
    }
  }, [signUp]);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <Button onClick={onClick}>Sign Up</Button>
    </div>
  );
};
