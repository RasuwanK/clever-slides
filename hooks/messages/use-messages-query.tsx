import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export interface UseMessagesQueryProps {
  chatId: string;
}

export function useMessagesQuery({ chatId }: UseMessagesQueryProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      if (!chatId) {
        return null;
      }

      const supabase = createClient();
      const { data: messages, error } = await supabase
        .from("Messages")
        .select("*")
        .eq("chat", chatId)
        .order("created_at", { ascending: false });

      if (error) {
        return null;
      }

      return messages;
    },
    staleTime: 60_000,
  });

  return {
    data,
    isLoading,
    error,
  };
}
