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
      void upsertUser(user);
    }
  }, [previous, user]);

  return null;
};
