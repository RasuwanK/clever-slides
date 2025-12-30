import { Logo } from "@/components/ui/logo";
import { createClient } from "@/lib/supabase/server";
import Prompt from "./prompt";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { getRecentPresentations } from "@/lib/utils";
import { AuthStatus } from "@/components/ui/dynamic/auth-status";
import Recents from "./recents";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const queryClient = new QueryClient();

  if (user) {
    await queryClient.prefetchQuery({
      queryKey: ["recents", user?.id],
      queryFn: () => getRecentPresentations(supabase, { userId: user.id }),
    });
  }


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
                  name: user?.user_metadata?.full_name,
                  email: user?.email,
                  avatarUrl: user?.user_metadata?.avatar_url,
                }}
              />
            </div>
          </header>
          <div
            id="centered"
            className="flex flex-col gap-5 min-h-screen items-center"
          >
            <Prompt userId={user?.id} />
            {user?.id && <Recents userId={user.id} />}
          </div>
          {/* <footer className="min-h-20 flex flex-col items-center justify-center w-full bg-primary">
            <p className="text-white">Created by Rasuwan Kalhara</p>
          </footer> */}
        </main>
      </div>
    </HydrationBoundary>
  );
}
