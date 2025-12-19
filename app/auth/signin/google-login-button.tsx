"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export function LoginWithGoogle() {
  const loginWithGoogle = async () => {
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });
  };

  return (
    <Button
      variant="outline"
      onClick={() => {
        loginWithGoogle();
      }}
    >
      <Image src="/google.svg" width={20} height={20} alt="Google logo" /> Sign
      in with Google
    </Button>
  );
}
