"use client";

import { useEditorStore } from "@/stores/editor-store";
import { Stage, Layer, Rect } from "react-konva";
import type { User } from "@/components/ui/auth-status";
import { usePresentation } from "@/hooks/use-presentation";
import { useEffect, useRef } from "react";
import { useDraftStore } from "@/stores/draft-store";
import { useRouter } from "next/navigation";
import { useGeneratePresentation } from "@/hooks/use-generate-presentation";
import { Titlebar } from "./titlebar";
import { RobotIcon } from "@phosphor-icons/react";

interface EditorProps {
  presentationId: string;
  user: User;
}

export default function EditorContainer({ presentationId, user }: EditorProps) {
  // For routing
  const router = useRouter();

  // State of the database saved presentation
  const {
    data: presentation,
    upsert: upsertPresentation,
    isLoading: isPresentationLoading,
    isUpdating: isPresentationUpdating,
    error: presentationError,
  } = usePresentation({ presentationId, userId: user.id! });

  // Local draft created by the prompt
  const localPresentation = useDraftStore((state) => state.draft);
  const setDraft = useDraftStore((state) => state.setDraft);

  // Config of the canvas
  const canvasConfig = useEditorStore((state) => state.canvasConfig);
  const setCanvasConfig = useEditorStore((state) => state.setCanvasConfig);

  // Canvas content
  const content = useEditorStore((state) => state.content);
  const setContent = useEditorStore((state) => state.setContent);

  // Mutation to generate presentation
  const generateMutation = useGeneratePresentation({
    saveFn: (data) => {
      // Update on generated
      upsertPresentation({
        ...localPresentation,
        created_by: user.id!,
        content: data,
      });
    },
  });

  // To get reference to the canvas parent
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Storing aspect ratio
  const aspectRatioRef = useRef(16 / 9);

  // To generate a new presentation if none exists
  useEffect(() => {
    // Skipping for loading state, error, or suceess (any settled state)
    // IMPORTANT: Removing this will cause infinite loop
    if (
      isPresentationLoading ||
      presentationError ||
      generateMutation.isPending ||
      generateMutation.isError ||
      generateMutation.isSuccess
    ) {
      return;
    }

    // If no presentation exists in DB, but there's a local draft, generate from prompt
    if (presentation === null && localPresentation) {
      if (!localPresentation.prompt) {
        // TODO: Fix this by opening a modal to enter prompt
        return router.push("/404");
      }

      generateMutation.mutate({
        prompt: localPresentation.prompt,
      });

      setDraft(null); // Clear local draft after generating
    }
  }, [
    localPresentation,
    router,
    generateMutation,
    generateMutation.isPending,
    generateMutation.isError,
    presentation,
    isPresentationLoading,
    presentationError,
    setDraft
  ]);

  useEffect(() => {
    // To resize the canvas
    const resize = () => {
      // Initializing the canvas config
      const canvasContainer = canvasContainerRef.current;

      // TODO: Get these values from presentation features
      // TODO: Create a utility to initialize presentation features

      if (!canvasContainer) return;

      const containerWidth = canvasContainer.clientWidth;

      const minWidth = 400; // Minimum width the canvas can take
      const width =
        containerWidth * 0.8 < minWidth ? minWidth : containerWidth * 0.8; // 80% of the container width
      const height = width / aspectRatioRef.current;

      setCanvasConfig({
        width: width,
        height: height,
        backgroundColor: "#ffffff",
      });
    };

    // Initial resize
    resize();

    // Adding resize event listener
    window.addEventListener("resize", resize);

    return () => {
      // To clean up the event listener
      window.removeEventListener("resize", resize);
    };
  }, [setCanvasConfig]);

  return (
    <div id="editor" className="grid grid-cols-[200px_auto] w-full h-screen">
      <div id="slides-nav" className="flex flex-col gap-4 h-full">
        {/* {content.slides.map((slide, index) => (
              <Card key={index} className="cursor-pointer w-40 h-20"></Card>
            ))} */}
      </div>
      <div id="content" className="flex flex-col gap-10 h-full p-4">
        <Titlebar />
        <div
          id="slide-editor"
          className="grid grid-cols-[auto_300px] gap-2 w-full h-full"
        >
          <div
            id="canvas-and-toolbar"
            className="w-full h-full grid grid-rows-[auto_100px]"
          >
            <div
              id="canvas-container"
              ref={canvasContainerRef}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              {canvasConfig && (
                <Stage width={canvasConfig.width} height={canvasConfig.height}>
                  {/* Background layer */}
                  <Layer>
                    <Rect
                      x={0}
                      y={0}
                      width={canvasConfig.width}
                      height={canvasConfig.height}
                      fill={canvasConfig.backgroundColor}
                    />
                  </Layer>
                  <Layer>
                    <Rect
                      x={100}
                      y={100}
                      width={200}
                      height={200}
                      fill="royalblue"
                      draggable
                    />
                  </Layer>
                </Stage>
              )}
            </div>
            <div id="toolbar-container">Toolbar</div>
          </div>
          <aside
            id="ai-chat"
            className="flex flex-col gap-2 bg-black border rounded-md border-primary h-full right-0 top-0 py-4 px-2 text-sm"
          >
            <h1 className="flex flex-row gap-2">
              <RobotIcon size={20} /> <span>Your Assistant</span>
            </h1>
            {localPresentation?.prompt && (
              <div
                id="prompt"
                className="bg-white/10 p-2 rounded-sm text-xs text-white/40"
              >
                {localPresentation?.prompt}
              </div>
            )}
            <div id="chat-container"></div>
          </aside>
        </div>
      </div>
    </div>
  );
}
