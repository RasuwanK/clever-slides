import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentInsert } from "@/lib/types/utils";
import { createClient } from "@/lib/supabase/client";
import { upsertDocument } from "@/lib/utils/db";

export function useDocumentMutation() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationKey: ["document", "update"],
    mutationFn: async (document: DocumentInsert) => {
      const supabase = createClient();
      return upsertDocument(supabase, {
        document,
      });
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(["document", "update"], updated);
    },
  });

  return {
    isPending,
    mutateAsync,
    mutate,
    error,
  };
}
