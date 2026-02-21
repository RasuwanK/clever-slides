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
      <main className="relative isolate min-h-screen overflow-hidden flex flex-col items-center justify-center">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-28 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(72%_0.19_52_/_0.3)_0%,oklch(72%_0.19_52_/_0)_72%)] blur-2xl" />
          <div className="absolute -top-24 -right-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,oklch(68%_0.22_46_/_0.28)_0%,oklch(68%_0.22_46_/_0)_72%)] blur-2xl" />
          <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(70%_0.21_50_/_0.24)_0%,oklch(70%_0.21_50_/_0)_72%)] blur-2xl" />
          <div className="absolute -bottom-36 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(66%_0.21_44_/_0.22)_0%,oklch(66%_0.21_44_/_0)_72%)] blur-3xl" />
          <div className="absolute top-1/2 -left-44 h-96 w-96 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(74%_0.18_54_/_0.18)_0%,oklch(74%_0.18_54_/_0)_70%)] blur-3xl" />
          <div className="absolute top-1/2 -right-44 h-96 w-96 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(74%_0.18_54_/_0.16)_0%,oklch(74%_0.18_54_/_0)_70%)] blur-3xl" />
        </div>
        <div className="relative z-20 w-full">
          <Header user={user} />
        </div>
        <div
          id="prompt-input-container"
          className="relative z-10 flex flex-col justify-center h-full gap-10 w-full md:w-3xl px-2"
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
