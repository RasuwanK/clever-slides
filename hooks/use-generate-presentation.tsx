"use client";

import { useMutation } from "@tanstack/react-query";
import { GeneratedContent, generatePresentation } from "@/lib/utils/supabase";

interface UseGeneratePresentationProps {
  saveFn: (data: GeneratedContent) => void;
}

export function useGeneratePresentation({
  saveFn,
}: UseGeneratePresentationProps) {
  return useMutation({
    mutationFn: generatePresentation,
    onSuccess: (data) => {
      saveFn(data);
    },
    onError: () => {
      console.error("Error while generating presentation");
    },
  });
}
