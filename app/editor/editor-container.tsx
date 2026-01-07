"use client";

import { Card } from "@/components/ui/card";
import { usePresentation } from "@/hooks/use-presentation";
import { createClient } from "@/lib/supabase/client"
import { Content } from "@/lib/utils";
import { useEditorStore } from "@/stores/editor-store";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Stage, Text, Layer, Circle, Rect } from "react-konva";
import { Button } from "@/components/ui/button";
import { DownloadSimpleIcon, PresentationIcon } from "@phosphor-icons/react";
import AuthStatus from "@/components/ui/auth-status";
import type { User } from "@/components/ui/auth-status";

interface EditorProps {
  presentationId: string;
  user: User;
}

export default function EditorContainer({ presentationId, user }: EditorProps) {
  // TODO: Fix the page load time by loaing project data on ssr and slides on client side
  const supabase = createClient();
  const router = useRouter();

  // Fetching and storing the presentation
  const { data: presentation, isLoading, error } = usePresentation({
    supabase,
    presentationId,
    userId: user?.id!
  });

  const setContent = useEditorStore((s) => s.setContent);
  const content = useEditorStore((s) => s.content);
  const config = useEditorStore((s) => s.canvasConfig);
  const setConfig = useEditorStore((s) => s.setCanvasConfig);

  // As soon as the data is changed presentation is loaded
  useEffect(() => {
    // Initializing canvasConfig
    const computedWidth = (window.innerWidth - 200) * 0.60;
    // Aspect ratio
    const heightPerWidth = 9 / 16;

    setConfig({
      width: computedWidth,
      height: computedWidth * heightPerWidth,
      backgroundColor: "white"
    });

    console.log(presentation)

    if (presentation?.content) {
      // To make the typecase convenient it is stored as a string
      setContent(presentation.content as Content);
    } else {
      setContent({
        title: "Sample Presentation",
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

  // TODO: HANDLE when presentation has not generated
  if (!content) return null

  return (
    <div id="editor-page-container" className="flex flex-col min-h-screen">
      <main id="editor-page" className="flex flex-col p-4 h-screen">
        <div id="editor" className="w-full grid grid-cols-[200px_auto] h-screen">
          <div id="slides-nav" className="flex flex-col gap-4 max-w-40 h-full">
            {content.slides.map((slide, index) => (
              <Card key={index} className="cursor-pointer w-40 h-20"></Card>
            ))}
          </div>
          <div id="content" className="flex flex-col h-full">
            <nav id="navbar" className="w-full flex flex-row gap-2 items-center">
              <div id="file-info" className="flex flex-col">
                <h1 className="text-xl font-bold">{presentation?.content.title}</h1>
                <h2 className="text-sm">{presentation?.updated_at ?? ""}</h2>
              </div>
              <div id="right-aligned" className="flex flex-row ml-auto gap-4 items-center">
                <div id="controls" className="flex flex-row gap-2">
                  <Button variant="outline" className="min-w-40"><DownloadSimpleIcon size={32} />Export</Button>
                  <Button className="min-w-40"><PresentationIcon size={32} />Present</Button>
                </div>
                <div id="profile">
                </div>
              </div>
            </nav>
            <div id="slide" className="flex flex-col items-center h-full justify-center">
              {
                config && <Stage width={config.width} height={config.height}>
                  <Layer id="background-layer">
                    <Rect fill={config.backgroundColor} width={config.width} height={config.height} x={0} y={0} />
                  </Layer>
                  <Layer id="text-layer">

                  </Layer>
                </Stage>
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
