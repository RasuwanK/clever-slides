"use client";

import { useMutation } from "@tanstack/react-query";
import { generatePresentation } from "@/lib/utils/db";
import type { GeneratedContent } from "@/lib/types/utils";

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
