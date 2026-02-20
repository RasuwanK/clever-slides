import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageInsert } from "@/lib/types/utils";
import { createClient } from "@/lib/supabase/client";
import { saveMessage } from "@/lib/utils/db";

interface UseMessageMutationPayload {
  message: MessageInsert;
}

export function useMessageMutation() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationKey: ["messages", "update"],
    mutationFn: async ({ message }: UseMessageMutationPayload) => {
      const supabase = createClient();
      return saveMessage(supabase, {
        message
      });
    },
    onSuccess: (_saved, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.message.chat],
      });
      queryClient.invalidateQueries({
        queryKey: ["chat"],
      });
    },
  });

  return {
    isPending,
    mutateAsync,
    mutate,
    error,
  };
}
