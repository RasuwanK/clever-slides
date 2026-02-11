import { Logo } from "@/components/ui/logo";
import { createClient } from "@/lib/supabase/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AuthStatus } from "@/components/ui/dynamic/auth-status";
import { Typewriter } from "@/components/ui/typewriter";
import { MainPromptInput } from "@/components/ui/main-prompt-input";

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
                user={
                  user !== null
                    ? {
                        id: user?.id as string,
                        name: user?.user_metadata?.full_name,
                        email: user?.email as string,
                        avatarUrl: user?.user_metadata.avatar_url,
                      }
                    : null
                }
              />
            </div>
          </header>
          <div
            id="centered"
            className="flex flex-col gap-5 min-h-screen items-center"
          >
            <div
              id="promt-dialog"
              className="mt-[calc(30vh)] flex flex-col gap-10"
            >
              <header className="flex flex-col items-center gap-5">
                <Typewriter
                  text="Think. Type. Create"
                  className="text-6xl font-bold text-primary"
                />
                <p className="text-xl">
                  Create presentations with a single prompt
                </p>
              </header>
              <MainPromptInput userId={user?.id} />
            </div>
          </div>
        </main>
      </div>
    </HydrationBoundary>
  );
}
