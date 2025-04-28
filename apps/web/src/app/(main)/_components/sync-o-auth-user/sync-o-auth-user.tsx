'use client';

import { useAsyncEffect } from 'ahooks';
import { useState } from 'react';

import { upsertUser } from './actions/upsert-user';
import { createClient } from '../../../_libs/auth/client/instance';

import type { User } from '@supabase/supabase-js';
import type { FC } from 'react';

export const SyncOAuthUser: FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useAsyncEffect(async () => {
    const response = await createClient().auth.getUser();
    const newUser = response.data.user;

    if (!!newUser && user != newUser) {
      void upsertUser(newUser);
      setUser(newUser);
    }
  }, []);

  return null;
};
