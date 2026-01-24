"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPresentation, type PresentationInsert, type PresentationDraft } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface usePresentationCreateProps {
  userId: string | undefined;
}

export function usePresentationCreate() {
  const supabase = createClient();
  return useMutation({
    mutationKey: ["createPresentation"],
    mutationFn: async (data: PresentationInsert) => {
      return createPresentation(supabase, data);
    },                                                                                     
  });
}
