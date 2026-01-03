"use client";

import { usePresentation } from "@/hooks/use-presentation";
import { createClient } from "@/lib/supabase/client"
import { Content } from "@/lib/utils";
import { useEditorStore } from "@/stores/editor-store";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

interface EditorProps {
  presentationId: string;
  userId: string;
}

export default function EditorContainer({ presentationId, userId }: EditorProps) {
  const supabase = createClient();
  const router = useRouter();

  // Fetching and storing the presentation
  const { data: presentation, isLoading, error } = usePresentation({
    supabase,
    presentationId,
    userId
  });

  const setSlides = useEditorStore((s) => s.setSlides);
  const slides = useEditorStore((s) => s.slides);

  // As soon as the data is changed presentation is loaded
  useEffect(() => {
    if (presentation?.content) {
      // To make the typecase convenient it is stored as a string
      setSlides(presentation.content as Content);
    } else {
      setSlides({
        theme: {
          accentColor: "white",
          background: "light"
        },
        slides: [
          {
            layout: "title_center",
            title: "Sample title",
            bullets: [
              "Sample bullet",
            ]
          }
        ]
      })
    }
  }, [presentation?.id])

  useEffect(() => {
    if (error?.message === "NOT_FOUND") {
      router.push("/404");
    }
  }, [error]);

  if (isLoading) return <p>Loading</p>

  if (!presentation) return null;

  // TODO: HANDLE when presentation has not generated
  if (!presentation.content) return null

  return (
    <div id="editor-page-container" className="flex flex-col min-h-screen">
      <main id="editor-page" className="flex flex-col">
        <div id="editor" className="grid grid-cols-2">
          <div id="slides-nav">
            {JSON.stringify(slides)}
          </div>
        </div>
      </main>
    </div>
  )
}
