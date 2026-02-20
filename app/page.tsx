import { createClient } from "@/lib/supabase/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Typewriter } from "@/components/ui/typewriter";
import { MainPromptInput } from "@/components/ui/main-prompt-input";
import Header from "./header";

export default async function Home() {
  // TODO: Fix the page loading time
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-screen flex flex-col items-center justify-center">
        <Header user={user} />
        <div
          id="prompt-input-container"
          className="flex flex-col justify-center h-full gap-10 w-full md:w-3xl px-2"
        >
          <header className="flex flex-col items-center gap-5">
            <Typewriter
              text="Think. Type. Create."
              className="text-4xl sm:text-6xl text-center font-bold text-primary"
            />
            <p className="text-sm sm:text-xl text-center text-foreground">
              Create presentations with a single prompt
            </p>
          </header>
          <MainPromptInput userId={user?.id} />
        </div>
      </main>
    </HydrationBoundary>
  );
}
