import { LoginForm } from "./signin-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { LoginWithGoogle } from "./google-login-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/auth/success");
  }

  return (
    <>
      <LoginForm />
      <p className="mt-4">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="text-primary font-bold">
          sign up
        </Link>
      </p>
      <div className="flex flex-col gap-3 mt-10">
        <p className="font-bold">Or else sign in with a provider</p>
        <LoginWithGoogle />
        <Button variant="outline">
          <Image src="/github.svg" width={20} height={20} alt="Github logo" />{" "}
          Sign in with Github
        </Button>
      </div>
    </>
  );
}
