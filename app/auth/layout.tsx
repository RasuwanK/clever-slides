import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // TODO: Fix this to redirect to dashboard instead of home
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen w-screen items-stretch justify-stretch">
      <main className="flex flex-row items-stretch w-screen h-screen">
        <div className="flex flex-col justify-center min-w-125 p-10">
          {children}
        </div>
        <aside className="flex flex-col justify-center p-10 w-[70%]">
          <h1 className="text-6xl capitalize font-bold text-primary-foreground space-y-2">
            <span>Create your slides</span>
            <br />
            <span className="text-5xl lowercase">
              the <span className="text-primary">right way.</span>
            </span>
          </h1>
          <p className="text-xl text-white mt-5">
            Login to use the world&apos;s best AI presentation generator
          </p>
        </aside>
      </main>
    </div>
  );
}
