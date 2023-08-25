'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { usePrevious } from 'ahooks';
import { useEffect } from 'react';

import { upsertUser } from './actions/upsert-user';

import type { FC } from 'react';

export const SyncOAuthUser: FC = () => {
  const user = useUser();
  const previous = usePrevious(user);

  useEffect(() => {
    if (user && !previous) {
      void upsertUser({
        id: user.id,
        accountName: user.user_metadata['user_name'],
        displayName: user.user_metadata['name'] ?? null,
        avatarUrl: user.user_metadata['avatar_url'],
      });
    }
  }, [previous, user]);

  return null;
};
