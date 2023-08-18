'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { usePrevious } from 'ahooks';
import { useEffect } from 'react';

import { upsertUser } from './actions/upsert-user';

import type { FC, PropsWithChildren } from 'react';

export const SyncOAuthUser: FC<PropsWithChildren> = ({ children }) => {
  const user = useUser();
  const previous = usePrevious(user);

  useEffect(() => {
    if (user && !previous) {
      void upsertUser({
        id: user.id,
        accountName: user.user_metadata['user_name'],
        displayName: user.user_metadata['name'],
        avatarUrl: user.user_metadata['avatar_url'],
      });
    }
  }, [previous, user]);

  return <>{children}</>;
};
