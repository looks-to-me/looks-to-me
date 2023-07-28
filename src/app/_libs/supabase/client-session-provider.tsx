'use client';

import { SessionContextProvider } from '@supabase/auth-helpers-react';

import { supabase } from './client-instance';

import type { FC, PropsWithChildren } from 'react';

export const SupabaseClientSessionProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionContextProvider supabaseClient={supabase}>{children}</SessionContextProvider>;
};
