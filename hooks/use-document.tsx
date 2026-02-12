"use client";

import { createClient } from "@/lib/supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";

interface UseDocumentProps {
  presentationId: string;
}

export function useDocument({ presentationId }: UseDocumentProps) {
  // Fetching the latest document
  const documentQuery = useQuery({
    queryKey: ["document", presentationId],
    queryFn: async () => {
      const supabase = createClient();
      return;
    },
    enabled: presentationId ? true : false,
    staleTime: 60_000,
  });

  const documentMutation = useMutation({
    mutationKey: ["document", "update"],
    mutationFn: () => {},
  });
}
