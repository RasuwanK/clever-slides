import { createClient } from "@/lib/supabase/client";
import { getPresentation } from "@/lib/utils/db";
import { useQuery } from "@tanstack/react-query";

export interface UsePresentationQueryProps {
  presentationId: string;
  userId: string;
}

// For fetching a presentation belonging to a user
export function usePresentationQuery({
  presentationId,
  userId,
}: UsePresentationQueryProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["presentation", presentationId, userId],
    queryFn: async () => {
      if (!presentationId || !userId) {
        throw new Error("No presentation id or user id provided");
      }

      const supabase = createClient();

      return getPresentation(supabase, {
        presentationId,
        userId,
      });
    },
    staleTime: 60_000,
  });

  return {
    data,
    isLoading,
    error,
  };
}
