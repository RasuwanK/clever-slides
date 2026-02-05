"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getPresentation, upsertPresentation } from "@/lib/utils/db";
import type { PresentationUpdate } from "@/lib/types/utils";
import { useDraftStore } from "@/stores/draft-store";

interface UsePresentationProps {
  presentationId: string;
  userId: string;
}

export function usePresentation({ presentationId, userId }: UsePresentationProps) {
  const queryClient = useQueryClient();
  
  // Fetch presentation data
  const { data, isLoading, error } = useQuery({
    queryKey: ["presentation", presentationId, userId],
    queryFn: async () => {
      const supabase = createClient();
      return getPresentation(supabase, {
        presentationId,
        userId,
      });
    },
    enabled: Boolean(presentationId && userId),
    staleTime: 60_000,
  });

  // When the presentation is null used the saved draft
  const draft = useDraftStore((state) => state.draft);
  const setDraft = useDraftStore((state) => state.setDraft);

  // Mutation to update presentation
  const updateMutation = useMutation({
    mutationKey: ["presentation", "update", presentationId, userId],
    mutationFn: async (updates: PresentationUpdate) => {
      if (!presentationId || !userId) {
        throw new Error("MISSING_IDS");
      }

      const supabase = createClient();
      return upsertPresentation(supabase, {
        presentationId,
        userId,
        updates,
      });
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(
        ["presentation", presentationId, userId],
        updated
      );

      setDraft(null);
    },
  });

  return {
    data: data ?? draft,
    isLocal: data === null && draft !== null,
    isLoading,
    error,
    upsert: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}
