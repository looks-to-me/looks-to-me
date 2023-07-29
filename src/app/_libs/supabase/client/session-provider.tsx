'use client';

import { SessionContextProvider } from '@supabase/auth-helpers-react';

import { supabase } from './instance';

import type { FC, PropsWithChildren } from 'react';

export const SessionProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
};
