"use client";

import { PersonIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Avatar } from "./avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthStatusProps {
  user: User | null;
}

export function UserAvatar({ user }: { user: User | null }) {
  return (
    <Avatar className="rounded-full">
      <AvatarImage src={user?.avatarUrl} alt="@username" />
      <AvatarFallback>
        {user?.name && user?.name.charAt(0) + user?.name.charAt(1)}
      </AvatarFallback>
    </Avatar>
  );
}

export function AccountButton({ user, ...props }: AuthStatusProps) {
  const router = useRouter();

  return user ? (
    <Button
      variant="outline"
      className="rounded-full p-2 border-2 h-12 border-primary drop-shadow-2xl cursor-pointer flex flex-row items-center"
      {...props}
    >
      <ChevronDownIcon className="w-5 h-5 mr-2 text-primary" />
      <UserAvatar user={user} />
    </Button>
  ) : (
    <Button
      onClick={() => {
        router.push("/auth/signin");
      }}
      className="rounded-full p-2 border-2 h-12 border-primary drop-shadow-2xl cursor-pointer flex flex-row items-center"
    >
      <span>Sign in</span>
      <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ml-2">
        <PersonIcon className="w-6 h-6 text-white relative" />
      </div>
    </Button>
  );
}

export default function AuthStatus({ user }: AuthStatusProps) {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    // Redirect to home page after logout
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AccountButton user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-70" align="end">
        <DropdownMenuLabel className="flex flex-col gap-2">
          <p>My account</p>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex flex-row gap-1 cursor-pointer">
            <div>
              <UserAvatar user={user} />
            </div>
            <div>
              <p className="font-bold">{user?.name}</p>
              <p className="font-normal text-md">{user?.email}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-400 cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
