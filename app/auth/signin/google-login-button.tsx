"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useCallback } from "react";

export function LoginWithGoogle() {
  const supabase = createClient();

  const loginWithGoogle = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });
  }, [supabase]);

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
