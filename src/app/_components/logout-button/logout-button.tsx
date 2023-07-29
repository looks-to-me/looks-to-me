'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { supabase } from '../../_libs/auth/client/instance';
import { Button } from '../button';

import type { MouseEventHandler, FC , ComponentPropsWithoutRef } from 'react';

type OmitProps = 'asChild';

export type LogoutButtonProps = Omit<ComponentPropsWithoutRef<typeof Button>, OmitProps> & {
  // nothing
};

export const LogoutButton: FC<LogoutButtonProps> = ({
  className,
  ...props
}) => {
  const router = useRouter();
  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    // TODO: エラーハンドリング
    // const { error: _error } =
    await supabase.auth.signOut();

    router.refresh();
  }, [router]);

  return (
    <Button {...props} className={className} onClick={handleClick}>
      Logout
    </Button>
  );
};
