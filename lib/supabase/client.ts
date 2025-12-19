import { createBrowserClient } from '@supabase/ssr'

export function createClient({isLocal}: {isLocal?: boolean} = {isLocal: false}) {
  return createBrowserClient(
    isLocal ? process.env.NEXT_PUBLIC_LOCAL_SUPABASE_URL! : process.env.NEXT_PUBLIC_SUPABASE_URL!,
    isLocal ? process.env.NEXT_PUBLIC_LOCAL_SUPABASE_KEY! : process.env.NEXT_PUBLIC_SUPABASE_KEY!
  )
}