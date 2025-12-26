import { Logo } from "@/components/ui/logo";
import { AuthStatus } from "@/components/ui/auth-status";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Prompt from "./prompt";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col">
      <main className="flex flex-col items-center jus min-h-screen">
        <header className="flex flex-row w-full items-center fixed top-0 p-5">
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
          <Prompt />
        </div>
        <footer className="min-h-20 flex flex-col items-center justify-center w-full bg-primary">
          <p className="text-white">Created by Rasuwan Kalhara</p>
        </footer>
      </main>
    </div>
  );
}
