'use client';

import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import { useCallback, type FC, type MouseEventHandler } from 'react';

import * as styles from './logout-button.css';
import { Button } from '../button';

export type LogoutButtonProps = {
  className?: string | undefined;
};

export const LogoutButton: FC<LogoutButtonProps> = ({
  className,
}) => {
  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async (event) => {
    event.preventDefault();

    await signOut();
  }, []);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <Button onClick={onClick}>ログアウト</Button>
    </div>
  );
};
