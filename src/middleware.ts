import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  /**
   * cookieでセッションを追跡できるようにするための設定
   * @see https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
   */
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()

  return res
}
