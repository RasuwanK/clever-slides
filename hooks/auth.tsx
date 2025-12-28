"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";

const AuthContext = createContext<any>(null);

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: any;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(initialUser);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthUser() {
  return useContext(AuthContext);
}