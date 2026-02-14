import { createClient } from "@/lib/supabase/client";
import { getDocument } from "@/lib/utils/db";
import { useQuery } from "@tanstack/react-query";

export interface UseDocumentQueryProps {
  presentationId: string;
}

export function useDocumentQuery({ presentationId }: UseDocumentQueryProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["document", presentationId],
    queryFn: async () => {
      if (!presentationId) {
        throw new Error("No presentation id provided");
      }

      const supabase = createClient();

      return getDocument(supabase, {
        presentationId,
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
