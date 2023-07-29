import { supabase } from './instance';

import type { Session } from '@supabase/supabase-js';

export const getSession = async (): Promise<Session | null> => {
  const { data: { session } } = await supabase.auth.getSession();

  return session;
};
