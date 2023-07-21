'use client'

import clsx from 'clsx';

import * as styles from './sign-out-button.css';

import { useCallback, type FC, MouseEventHandler } from 'react';
import { Button } from '../button';
import { useRouter } from 'next/navigation'
import { supabase } from '../../_libs/supabase/client-instance';

export type SignOutButtonProps = {
  className?: string | undefined;
};

export const SignOutButton: FC<SignOutButtonProps> = ({
  className,
}) => {
  const router = useRouter()
  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    const {error: _error} = await supabase.auth.signOut()

    router.refresh()
  }, [])

  return (
    <div className={clsx(className, styles.wrapper)}>
      <Button onClick={onClick}>ログアウト</Button>
    </div>
  );
};
