import { Session } from "@supabase/supabase-js"
import { supabase } from "./server-instance"

type GetServerSession = () => Promise<{ session: Session | null }>
export const getServerSession: GetServerSession = async () => {
  const { data } = await supabase.auth.getSession()

  return data
}
