"use client";

import { getPresentation } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/database.types";
import { useDraftStore } from "@/stores/draft-store";
import { useEffect } from "react";

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
  const {data, isLoading, error} = useQuery({
    queryKey: ["getPresentation", presentationId],
    queryFn: () => getPresentation(supabase, {
      presentationId,
      userId,
    }),
    enabled: !!presentationId && !!userId,
  });

  const {draft, setDraft} = useDraftStore();

  console.log("Local Draft in usePresentation:", draft);

  return {
    data,
    isLoading,
    error,
  }
  
}