"use client";

import { useMutation } from "@tanstack/react-query"
import { generatePresentation } from "@/lib/utils"

export function useGeneratePresentation() {
    return useMutation({
        mutationFn: generatePresentation
    });
}