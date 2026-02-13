"use client";

import { createClient } from "@/lib/supabase/client";
import { ChatInsert } from "@/lib/types/utils";
import { getChat, upsertChat } from "@/lib/utils/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UseChatProps {
  presentationId?: string;
}

export function useChat({ presentationId }: UseChatProps) {
  const queryClient = useQueryClient();

  // Fetching the latest chat
  const chatQuery = useQuery({
    queryKey: ["chat", presentationId],
    queryFn: async () => {
      // No chat returned for an empty presentation
      if (!presentationId) {
        return null;
      }

      const supabase = createClient();
      return getChat(supabase, {
        presentationId,
      });
    },
    enabled: presentationId ? true : false,
    staleTime: 60_000,
  });

  // Updating the chat to the latest
  const chatMutation = useMutation({
    mutationKey: ["chat", "update"],
    mutationFn: (chat: ChatInsert) => {
      const supabase = createClient();

      return upsertChat(supabase, {
        chat,
      });
    },
    onSuccess: (updated) => {
      // Optimistic updates
      queryClient.setQueryData(["chat", presentationId], updated);
    },
  });

  return {
    data: chatQuery.data,
    isLoading: chatQuery.isLoading,
    isUpdating: chatMutation.isPending,
    error: chatQuery.error,
    updateError: chatMutation.error,
    upsert: chatMutation.mutateAsync,
  };
}
