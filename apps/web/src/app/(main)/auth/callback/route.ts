import { NextResponse } from 'next/server';

import { createClient } from '../../../_libs/auth/server/instance';

import type { NextRequest } from 'next/server';

/**
 * Used for login with the supabase authentication client.
 * @see https://supabase.com/docs/guides/auth/social-login/auth-github?queryGroups=environment&environment=server#add-login-code-to-your-client-app
 */
export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);

  // if "next" is in param, use it as the redirect URL
  const next = url.searchParams.get('next') ?? '/';
  const code = url.searchParams.get('code');

  if (code) {
    const client = await createClient();
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        return NextResponse.redirect(`${url.origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${url.origin}${next}`);
      }
    }
  }
  return NextResponse.redirect(url.origin, { status: 401 });
};
