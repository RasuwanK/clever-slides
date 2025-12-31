"use client";

import { EditorStateGate } from "@/components/editor-state-gate";
import { useGeneratePresentation } from "@/hooks/use-generate-presentation";
import { usePresentation } from "@/hooks/use-presentation";
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface EditorProps {
  presentationId: string;
  userId: string;
}

export default function EditorContainer({ presentationId, userId }: EditorProps) {
  const supabase = createClient();
  const router = useRouter();

  // Fetching and storing the presentation
  const {data: presentation, isLoading, error} = usePresentation({
    supabase,
    presentationId,
    userId
  });

  const generateMutation = useGeneratePresentation();

  useEffect(() => {
    if(error?.message === "NOT_FOUND") {
      router.push("/404");
    }
  }, [error]);

  if(isLoading) return <p>Loading</p>

  if(!presentation) return null;

  return (
    <EditorStateGate presentation={presentation} onGenerate={(prompt) => {
      // generateMutation.mutate({prompt}, {
      //   onSuccess: (schema) => {
      //     console.log(schema);
      //   },
      //   onError: () => {
      //     console.log("An error has occured");
      //   }
      // });
    }} />
  )
}
