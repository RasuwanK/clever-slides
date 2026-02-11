import { Logo } from "@/components/ui/logo";
import { AuthStatus } from "@/components/ui/dynamic/auth-status";
import { User } from "@supabase/supabase-js";

interface HeaderProps {
  user?: User | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="flex flex-row w-full fixed top-0 h-25 items-center p-5">
      <Logo />
      <div className="ml-auto">
        <AuthStatus
          user={
            user !== null
              ? {
                  id: user?.id as string,
                  name: user?.user_metadata?.full_name,
                  email: user?.email as string,
                  avatarUrl: user?.user_metadata.avatar_url,
                }
              : null
          }
        />
      </div>
    </header>
  );
}
