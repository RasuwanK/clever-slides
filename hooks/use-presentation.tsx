"use client";

import { getPresenstation } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/database.types";

interface usePresentationProps {
  supabase: SupabaseClient<Database>;
  presentationId: string;
  userId: string;
}

export function usePresentation({
  supabase,
  presentationId,
  userId,
}: usePresentationProps) {
  return useQuery({
    queryKey: ["getPresentation", presentationId],
    queryFn: () => getPresenstation(supabase, {
      presentationId,
      userId,
    }),
    enabled: !!presentationId && !!userId,
  });
}
