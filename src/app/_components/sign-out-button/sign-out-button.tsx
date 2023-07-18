import { useClerk } from '@clerk/nextjs';
import clsx from 'clsx';
import { useCallback } from 'react';

import * as styles from './sign-out-button.css';
import { Button } from '../button';

import type { MouseEventHandler, FC } from 'react';

export type SignOutButtonProps = {
  className?: string | undefined;
};

export const SignOutButton: FC<SignOutButtonProps> = ({
  className,
}) => {
  const { signOut } = useClerk();

  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async (event) => {
    event.preventDefault();

    try {
      if (signOut) {
        await signOut();
      }
    } catch (error) {
      console.error({ error });
    }
  }, [signOut]);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <Button onClick={onClick}>Sign Out</Button>
    </div>
  );
};
