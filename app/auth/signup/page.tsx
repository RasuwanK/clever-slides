import { SignUpForm } from "./signup-form";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Current user on signup page:", user);

  if (user) {
    redirect("/auth/success");
  }

  return (
    <>
      <SignUpForm />
      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-primary font-bold">
          sign in
        </Link>
      </p>
    </>
  );
}
