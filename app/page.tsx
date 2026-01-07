import { Logo } from "@/components/ui/logo";
import { createClient } from "@/lib/supabase/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AuthStatus } from "@/components/ui/dynamic/auth-status";
import Generate from "./generate";

export default async function Home() {
  // TODO: Fix the page loading time
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col">
        <main className="flex flex-col items-center jus min-h-screen mb-30">
          <header className="flex flex-row w-full items-center fixed top-0 h-25 p-5">
            <Logo />
            <div className="ml-auto">
              <AuthStatus
                isAuth={user ? true : false}
                user={{
                  id: user?.id,
                  name: user?.user_metadata?.full_name,
                  email: user?.email,
                  avatarUrl: user?.user_metadata?.avatar_url,
                }}
              />
            </div>
          </header>
          {/* <footer className="min-h-20 flex flex-col items-center justify-center w-full bg-primary">
            <p className="text-white">Created by Rasuwan Kalhara</p>
          </footer> */}
          <Generate userId={user?.id} />
        </main>
      </div>
    </HydrationBoundary>
  );
}
