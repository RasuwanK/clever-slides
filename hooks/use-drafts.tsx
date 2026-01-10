"use client";

import { useQuery } from "@tanstack/react-query"
import { getRecentPresentations } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export interface useDraftProps {
  userId: string | undefined;
}

export function useDrafts({ userId }: useDraftProps) {
  const supabase = createClient()
  const query = useQuery({
    queryKey: ["drafts", userId],
    queryFn: () => getRecentPresentations(supabase, { userId }),
    enabled: !!userId
  });
  return query;
}
