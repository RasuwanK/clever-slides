import { TextAreaWithButton } from "@/components/ui/textarea-with-button";
import { Logo } from "@/components/ui/logo";
import { Typewriter } from "@/components/ui/typewriter";
import { AuthStatus } from "@/components/ui/auth-status";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
          className="flex flex-col gap-5 min-h-screen items-center justify-center"
        >
          <div id="promt-dialog" className="flex flex-col gap-10">
            <header className="flex flex-col items-center gap-5">
              <Typewriter
                text="Think. Type. Create"
                className="text-6xl font-bold text-primary"
              />
              <p className="text-xl">
                Create presentations with a single prompt
              </p>
            </header>
            <form>
              <TextAreaWithButton placeholder="Create a professional presentation for a pitch deck about an AI startup" />
            </form>
          </div>
          <div id="drafts" className="flex flex-col items-center">
            <h1>Drafts</h1>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent>
                  
                </CardContent>
                <CardFooter>Footer</CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <footer className="min-h-20 flex flex-col items-center justify-center w-full bg-primary">
          <p className="text-white">Created by Rasuwan Kalhara</p>
        </footer>
      </main>
    </div>
  );
}
