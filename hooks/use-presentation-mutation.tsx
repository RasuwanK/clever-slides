"use client";
import { useMutation } from "@tanstack/react-query";
import { createPresentation, type PresentationInsert } from "@/lib/utils";
import { type SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/database.types";

interface PresentationMutationProps {
  supabase: SupabaseClient<Database>;
}

export function usePresentationMutation({
  supabase,
}: PresentationMutationProps) {
  return useMutation({
    mutationKey: ["createPresentation"],
    mutationFn: async (data: PresentationInsert) => {
      return createPresentation(supabase, data);
    },
  });
}
