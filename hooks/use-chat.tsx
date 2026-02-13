"use client";

import { createClient } from "@/lib/supabase/client";
import { ChatInsert, MessageInsert } from "@/lib/types/utils";
import { getChat, getMessages, saveMessage, upsertChat } from "@/lib/utils/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UseChatProps {
  presentationId?: string;
  chatId?: string;
}

export function useChat({ presentationId, chatId }: UseChatProps) {
  const queryClient = useQueryClient();

  // Fetch the latest chat
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

  // Update chat
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

  const resolvedChatId = chatId ?? chatQuery.data?.id;

  // Fetch the latest messages
  const messagesQuery = useQuery({
    queryKey: ["messages", resolvedChatId],
    queryFn: async () => {
      const supabase = createClient();
      return getMessages(supabase, {
        chatId: resolvedChatId as string,
      });
    },
    enabled: resolvedChatId ? true : false,
    staleTime: 60_000,
  });

  // Update messages
  const messagesMutation = useMutation({
    mutationKey: ["messages", "update"],
    mutationFn: (message: MessageInsert) => {
      if (!resolvedChatId) {
        throw new Error("No chat ID provided");
      }

      const supabase = createClient();
      return saveMessage(supabase, {
        chatId: resolvedChatId,
        message,
      });
    },
    onSuccess: (updated) => {
      // Optimistic updates
      queryClient.setQueryData(["messages", resolvedChatId], updated);
    },
  });

  return {
    // Explicit chat API
    chat: {
      data: chatQuery.data,
      isLoading: chatQuery.isLoading,
      isUpdating: chatMutation.isPending,
      error: chatQuery.error,
      updateError: chatMutation.error,
      upsert: chatMutation.mutateAsync,
    },
    // Messages API
    messages: {
      data: messagesQuery.data,
      isLoading: messagesQuery.isLoading,
      isUpdating: messagesMutation.isPending,
      error: messagesQuery.error,
      updateError: messagesMutation.error,
      upsert: messagesMutation.mutateAsync,
    },
  };
}
