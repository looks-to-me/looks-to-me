import { createBrowserClient } from '@supabase/ssr';

import { publicEnv } from '../../env';

import 'client-only';

export const createClient = () => {
  return createBrowserClient(
    publicEnv().NEXT_PUBLIC_SUPABASE_URL,
    publicEnv().NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
};
