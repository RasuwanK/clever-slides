"use client";

import { useEditorStore } from "@/stores/editor-store";
import { Stage, Layer, Rect } from "react-konva";
import { Button } from "@/components/ui/button";
import { DownloadSimpleIcon, PresentationIcon } from "@phosphor-icons/react";
import type { User } from "@/components/ui/auth-status";
import { usePresentation } from "@/hooks/use-presentation";
import { useEffect } from "react";
import { useDraftStore } from "@/stores/draft-store";
import { useRouter } from "next/navigation";
import { useGeneratePresentation } from "@/hooks/use-generate-presentation";

interface EditorProps {
  presentationId: string;
  user: User;
}

export default function EditorContainer({ presentationId, user }: EditorProps) {
  // For routing
  const router = useRouter();

  // State of the database saved presentation
  const presentation = usePresentation({ presentationId, userId: user.id! });

  // Local draft created by the prompt
  const localPresentation = useDraftStore((state) => state.draft);

  // Config of the canvas
  const canvasConfig = useEditorStore((state) => state.canvasConfig);
  const setCanvasConfig = useEditorStore((state) => state.setCanvasConfig);

  // Canvas content
  const content = useEditorStore((state) => state.content);
  const setContent = useEditorStore((state) => state.setContent);

  // Mutation to generate presentation
  const generateMutation = useGeneratePresentation();

  // To generate a new presentation if none exists
  useEffect(() => {
    // Skipping for loading state, error, or suceess (any settled state)
    // IMPORTANT: Removing this will cause infinite loop
    if (
      presentation.isLoading ||
      presentation.error ||
      generateMutation.isPending ||
      generateMutation.isError ||
      generateMutation.isSuccess
    ) {
      return;
    }

    // If no presentation exists in DB, but there's a local draft, generate from prompt
    if (presentation.data === null && localPresentation) {
      if (!localPresentation.prompt) {
        // TODO: Fix this by opening a modal to enter prompt
        return router.push("/404");
      }

      generateMutation.mutate({
        prompt: localPresentation.prompt,
      });
    }
  }, [
    presentation.isLoading,
    presentation.data,
    localPresentation,
    router,
    generateMutation,
    presentation.error,
    generateMutation.isPending,
    generateMutation.isError,
  ]);

  return (
    <div id="editor-page-container" className="flex flex-col min-h-screen">
      <main id="editor-page" className="flex flex-col p-4 h-screen">
        <div
          id="editor"
          className="w-full grid grid-cols-[200px_auto] h-screen"
        >
          <div id="slides-nav" className="flex flex-col gap-4 max-w-40 h-full">
            {/* {content.slides.map((slide, index) => (
              <Card key={index} className="cursor-pointer w-40 h-20"></Card>
            ))} */}
          </div>
          <div id="content" className="flex flex-col h-full">
            <nav
              id="navbar"
              className="w-full flex flex-row gap-2 items-center"
            >
              <div id="file-info" className="flex flex-col">
                <h1 className="text-xl font-bold">
                  {/* {presentation?.content.title} */}
                </h1>
                {/* <h2 className="text-sm">{presentation?.updated_at ?? ""}</h2> */}
              </div>
              <div
                id="right-aligned"
                className="flex flex-row ml-auto gap-4 items-center"
              >
                <div id="controls" className="flex flex-row gap-2">
                  <Button variant="outline" className="min-w-40">
                    <DownloadSimpleIcon size={32} />
                    Export
                  </Button>
                  <Button className="min-w-40">
                    <PresentationIcon size={32} />
                    Present
                  </Button>
                </div>
                <div id="profile"></div>
              </div>
            </nav>
            <div
              id="slide"
              className="flex flex-col items-center h-full justify-center"
            >
              {/* {config && (
                <Stage width={config.width} height={config.height}>
                  <Layer id="background-layer">
                    <Rect
                      fill={config.backgroundColor}
                      width={config.width}
                      height={config.height}
                      x={0}
                      y={0}
                    />
                  </Layer>
                  <Layer id="text-layer"></Layer>
                </Stage>
              )} */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
