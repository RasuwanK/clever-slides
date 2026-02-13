"use client";

import { createClient } from "@/lib/supabase/client";
import { DocumentInsert } from "@/lib/types/utils";
import { getDocument, upsertDocument } from "@/lib/utils/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UseDocumentProps {
  presentationId?: string;
}

export function useDocument({ presentationId }: UseDocumentProps) {
  const queryClient = useQueryClient();

  // Fetching the latest document
  const documentQuery = useQuery({
    queryKey: ["document", presentationId],
    queryFn: async () => {
      // No presentation is returned for null presentation id
      if (!presentationId) {
        return null;
      }

      const supabase = createClient();
      return getDocument(supabase, {
        presentationId,
      });
    },
    enabled: presentationId ? true : false,
    staleTime: 60_000,
  });

  // Updating the document to the latest
  const documentMutation = useMutation({
    mutationKey: ["document", "update"],
    mutationFn: (document: DocumentInsert) => {
      const supabase = createClient();

      return upsertDocument(supabase, {
        document,
      });
    },
    onSuccess: (updated) => {
      // Optimistic updates
      queryClient.setQueryData(["presentation", presentationId], updated);
    },
  });

  return {
    data: documentQuery.data,
    isLoading: documentQuery.isLoading,
    isUpdating: documentMutation.isPending,
    error: documentQuery.error,
    updateError: documentMutation.error,
    upsert: documentMutation.mutateAsync,
  };
}
