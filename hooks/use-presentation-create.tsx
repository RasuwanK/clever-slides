"use client";
import { useMutation } from "@tanstack/react-query";
import { createPresentation } from "@/lib/utils/db";
import type { PresentationInsert } from "@/lib/types/utils";
import { createClient } from "@/lib/supabase/client";

export function usePresentationCreate() {
  const supabase = createClient();
  return useMutation({
    mutationKey: ["createPresentation"],
    mutationFn: async (data: PresentationInsert) => {
      return createPresentation(supabase, data);
    },                                                                                     
  });
}
