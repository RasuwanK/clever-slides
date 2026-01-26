"use client";

import { useQuery } from "@tanstack/react-query"
import { getRecentPresentations } from "@/lib/utils/supabase";
import { createClient } from "@/lib/supabase/client";

export interface useRecentProps {
  userId: string | undefined;
}

export function useRecents({ userId }: useRecentProps) {
  const supabase = createClient()
  const query = useQuery({
    queryKey: ["recents", userId],
    queryFn: () => getRecentPresentations(supabase, { userId }),
    enabled: !!userId
  });
  return query;
}
