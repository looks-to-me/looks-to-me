import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  /**
   * Keep user sessions up-to-date.
   * @see https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
   */
  const supabase = createMiddlewareClient({ req: request, res: response });
  await supabase.auth.getSession();

  return response;
};
