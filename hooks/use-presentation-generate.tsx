"use client"

import { generatePresentation } from "@/lib/utils/db"
import { useMutation } from "@tanstack/react-query"

export function useGeneratePresentation() {
    return useMutation({
        mutationKey: ["generatePresentation"],
        mutationFn: generatePresentation
    });
}