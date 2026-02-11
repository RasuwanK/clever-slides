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
      <div className="flex flex-col">
        <main className="w-full flex flex-col items-center jus min-h-screen mb-30">
          <Header user={user} />
          <div
            id="promt-input-container"
            className="mt-[calc(30vh)] flex flex-col gap-10 w-[90%] sm:max-w-2xl"
          >
            <header className="flex flex-col items-center gap-5">
              <Typewriter
                text="Think. Type. Create"
                className="text-4xl sm:text-6xl text-center font-bold text-primary"
              />
              <p className="text-sm sm:text-xl text-center">
                Create presentations with a single prompt
              </p>
            </header>
            <MainPromptInput userId={user?.id} />
          </div>
        </main>
      </div>
    </HydrationBoundary>
  );
}
