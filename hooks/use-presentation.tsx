"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getPresentation, updatePresentation, type PresentationUpdate } from "@/lib/utils/supabase";

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

  // Mutation to update presentation
  const updateMutation = useMutation({
    mutationKey: ["presentation", "update", presentationId, userId],
    mutationFn: async (updates: PresentationUpdate) => {
      if (!presentationId || !userId) {
        throw new Error("MISSING_IDS");
      }

      const supabase = createClient();
      return updatePresentation(supabase, {
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
    },
  });

  return {
    data,
    isLoading,
    error,
    updatePresentation: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}
