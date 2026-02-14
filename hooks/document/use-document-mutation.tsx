import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentInsert } from "@/lib/types/utils";
import { createClient } from "@/lib/supabase/client";
import { upsertDocument } from "@/lib/utils/db";

export interface UseDocumentMutationProps {
  presentationId: string;
}

export function useDocumentMutation({
  presentationId,
}: UseDocumentMutationProps) {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationKey: ["document", "update", presentationId],
    mutationFn: async (document: DocumentInsert) => {
      const supabase = createClient();
      return upsertDocument(supabase, {
        document,
      });
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(["document", presentationId], updated);
    },
  });

  return {
    isPending,
    mutateAsync,
    mutate,
    error,
  };
}
