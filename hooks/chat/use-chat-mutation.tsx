import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatInsert } from "@/lib/types/utils";
import { createClient } from "@/lib/supabase/client";
import { upsertChat } from "@/lib/utils/db";

export interface UseChatMutationProps {
  presentationId: string;
}

export function useChatMutation({ presentationId }: UseChatMutationProps) {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationKey: ["chat", "update", presentationId],
    mutationFn: async (chat: ChatInsert) => {
      const supabase = createClient();
      return upsertChat(supabase, {
        chat,
      });
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(["chat", presentationId], updated);
    },
  });

  return {
    isPending,
    mutateAsync,
    mutate,
    error,
  };
}
