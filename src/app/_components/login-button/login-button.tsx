'use client';

import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { useCallback, type FC, type MouseEventHandler } from 'react';

import * as styles from './login-button.css';
import { Button } from '../button';

export type LoginButtonProps = {
  className?: string | undefined;
};

export const LoginButton: FC<LoginButtonProps> = ({
  className,
}) => {
  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async (event) => {
    event.preventDefault();

    await signIn('github');
  }, []);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <Button onClick={onClick}>ログイン</Button>
    </div>
  );
};
