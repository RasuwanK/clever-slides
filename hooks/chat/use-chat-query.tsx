import { createClient } from "@/lib/supabase/client";
import { getChat } from "@/lib/utils/db";
import { useQuery } from "@tanstack/react-query";

export interface UseChatQueryProps {
  presentationId: string;
}

export function useChatQuery({ presentationId }: UseChatQueryProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["chat", presentationId],
    queryFn: async () => {
      if (!presentationId) {
        throw new Error("No presentation id provided");
      }

      const supabase = createClient();

      return getChat(supabase, {
        presentationId,
      });
    },
    staleTime: 60_000,
  });

  return {
    data,
    isLoading,
    error,
  };
}
