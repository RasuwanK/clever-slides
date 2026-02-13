"use client";

import { createClient } from "@/lib/supabase/client";
import { MessageInsert } from "@/lib/types/utils";
import { getMessages, saveMessage } from "@/lib/utils/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UseMessagesProps {
  chatId: string;
}

export function useMessages({ chatId }: UseMessagesProps) {
  const queryClient = useQueryClient();

  // Fetching the latest messages
  const messagesQuery = useQuery({
    queryKey: ["messages", chatId],
    queryFn: async (data: {}) => {
      const supabase = createClient();
      return getMessages(supabase, {
        chatId,
      });
    },
    enabled: chatId ? true : false,
    staleTime: 60_000,
  });

  // Updating the messages to the latest
  const messagesMutation = useMutation({
    mutationKey: ["messages", "update"],
    mutationFn: (message: MessageInsert) => {
      if (!chatId) {
        throw new Error("No chat ID provided");
      }

      const supabase = createClient();

      return saveMessage(supabase, {
        chatId,
        message,
      });
    },
    onSuccess: (updated) => {
      // Optimistic updates
      queryClient.setQueryData(["messages", chatId], updated);
    },
  });

  return {
    data: messagesQuery.data,
    isLoading: messagesQuery.isLoading,
    isUpdating: messagesMutation.isPending,
    error: messagesQuery.error,
    updateError: messagesMutation.error,
    upsert: messagesMutation.mutateAsync,
  };
}
