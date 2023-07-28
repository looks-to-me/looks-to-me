'use client'

import { FC, PropsWithChildren } from "react"
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from "./client-instance"

export const SupabaseClientSessionProvider: FC<PropsWithChildren> = ({children}) => {
  return <SessionContextProvider supabaseClient={supabase}>{children}</SessionContextProvider>
}
