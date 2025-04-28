import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

import { publicEnv } from './app/_libs/env';

import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    // eslint-disable-next-line unicorn/prefer-string-raw
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export const middleware = async (request: NextRequest) => {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    publicEnv().NEXT_PUBLIC_SUPABASE_URL,
    publicEnv().NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refreshing the Auth token
  await supabase.auth.getUser();

  return response;
};
