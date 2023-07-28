import { supabase } from './server-instance';

import type { Session } from '@supabase/supabase-js';

type GetServerSession = () => Promise<{ session: Session | null }>;
export const getServerSession: GetServerSession = async () => {
  const { data } = await supabase.auth.getSession();

  return data;
};
