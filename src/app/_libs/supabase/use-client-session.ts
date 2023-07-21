'use client'

import { useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type UseClientSession = () => {
  session: Session | null
}
export const useClientSession: UseClientSession = () => {
  const [session, setSession] = useState<Session | null>(null)

  const supabase = createClientComponentClient()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return { session }
}
