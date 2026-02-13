"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getPresentation, upsertPresentation } from "@/lib/utils/db";
import type { PresentationInsert } from "@/lib/types/utils";

interface UsePresentationProps {
  presentationId?: string;
  userId?: string;
}

export function usePresentation({
  presentationId,
  userId,
}: UsePresentationProps) {
  const queryClient = useQueryClient();

  // Fetch presentation data
  const { data, isLoading, error } = useQuery({
    queryKey: ["presentation", presentationId, userId],
    queryFn: async () => {
      // No ids provided nothing is fetched
      if (!presentationId || !userId) {
        return null;
      }

      const supabase = createClient();
      return getPresentation(supabase, {
        presentationId,
        userId,
      });
    },
    enabled: Boolean(presentationId && userId),
    staleTime: 60_000,
  });

  // Mutation to update presentation
  const updateMutation = useMutation({
    mutationKey: ["presentation", "update", userId],
    mutationFn: async (updates: PresentationInsert) => {
      const supabase = createClient();
      return upsertPresentation(supabase, {
        updates,
      });
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(
        ["presentation", presentationId, userId],
        updated,
      );
    },
  });

  return {
    data: data,
    isLoading,
    error,
    upsert: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}
