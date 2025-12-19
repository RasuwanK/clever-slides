import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient({isLocal}: {isLocal?: boolean} = {isLocal: false}) {
  const cookieStore = await cookies()

  return createServerClient(
    isLocal ? process.env.NEXT_PUBLIC_LOCAL_SUPABASE_URL! : process.env.NEXT_PUBLIC_SUPABASE_URL!,
    isLocal ? process.env.NEXT_PUBLIC_LOCAL_SUPABASE_KEY! : process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            console.error("Error while setting cookies in Server Component.");
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}