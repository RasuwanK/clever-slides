import { SignUpForm } from "./signup-form";
import Link from "next/link";

export default async function SignupPage() {
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
