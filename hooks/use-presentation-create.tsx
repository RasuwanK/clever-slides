"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPresentation, type PresentationInsert, type PresentationDraft } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface usePresentationCreateProps {
  userId: string | undefined;
}

export function usePresentationCreate({ userId }: usePresentationCreateProps) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createPresentation"],
    mutationFn: async (data: PresentationInsert) => {
      return createPresentation(supabase, data);
    },

    // Optimistic update
    onMutate: async (data: PresentationInsert) => {
      await queryClient.cancelQueries({
        queryKey: ["drafts", userId]
      });

      // Just a sample presentation dradft
      const optimisticDraft = {
        id: crypto.randomUUID(),
        content: data.content ?? null,
        prompt: data.prompt ?? null,
        created_at: data.created_at ?? new Date().toISOString(),
        isOptimistic: true
      }

      const previousDrafts = queryClient.getQueryData<any[]>(["drafts", userId]);

      // Setting temporary data
      queryClient.setQueryData(["drafts", userId], (old: any[]) => {
        return [optimisticDraft, ...old]
      });

      return { previousDrafts }
    },

    onError: (_err, data, context) => {
      if (context?.previousDrafts) {
        queryClient.setQueryData(
          ["drafts", userId],
          context.previousDrafts
        )
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts", userId] })
    }
  });

}
