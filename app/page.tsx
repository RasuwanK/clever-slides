import { TextAreaWithButton } from "@/components/ui/textarea-with-button";
import { Logo } from "@/components/ui/logo";
import { Typewriter } from "@/components/ui/typewriter";
import { AuthStatus } from "@/components/ui/auth-status";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {data: {user}} = await supabase.auth.getUser();

  return (
    <div className="flex flex-col">
      <main>
        <header className="flex flex-row w-full items-center fixed top-0 p-5">
          <Logo />
          <div className="ml-auto">
            <AuthStatus isAuth={user ? true : false} user={{
              name: user?.user_metadata?.full_name,
              email: user?.email,
              avatarUrl: user?.user_metadata?.avatar_url,
            }} />
          </div>
        </header>
        <div id="promt-dialog" className="flex flex-col min-h-screen justify-center items-center gap-10">
          <header className="flex flex-col items-center gap-5">
            <Typewriter text="Think. Type. Create" className="text-6xl font-bold text-primary" />
            <p className="text-xl">Create presentations with a single prompt</p>
          </header>
          <form>
            <TextAreaWithButton
              placeholder="Create a professional presentation for a pitch deck about an AI startup"
            />
          </form>
        </div>
        <div id="drafts" className="grid grid-cols-3">
          <div className="w-10 h-10 bg-primary"></div>
        </div>
        <footer className="min-h-20 flex flex-col items-center justify-center bg-primary">
          <p className="text-white">Created by Rasuwan Kalhara</p>
        </footer>
      </main>
    </div>
  );
}
