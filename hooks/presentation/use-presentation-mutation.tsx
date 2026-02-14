import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PresentationInsert } from "@/lib/types/utils";
import { createClient } from "@/lib/supabase/client";
import { upsertPresentation } from "@/lib/utils/db";

export interface UsePresentationMutationProps {
  userId: string;
}

export function usePresentationMutation({
  userId,
}: UsePresentationMutationProps) {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationKey: ["presentation", "update", userId],
    mutationFn: async (updates: PresentationInsert) => {
      const supabase = createClient();

      return upsertPresentation(supabase, {
        updates,
      });
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(["presentation", userId], updated);
    },
  });

  return {
    isPending,
    mutateAsync,
    mutate,
    error,
  };
}
