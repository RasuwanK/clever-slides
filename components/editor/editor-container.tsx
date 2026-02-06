"use client";

//import { useEditorStore } from "@/stores/editor-store";
import { Stage, Layer, Rect } from "react-konva";
import type { User } from "@/components/ui/auth-status";
import { usePresentation } from "@/hooks/use-presentation";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGeneratePresentation } from "@/hooks/use-generate-presentation";
import { Titlebar } from "@/components/editor/titlebar";
import { AIChat } from "./ai-chat";
import { GeneratedContent } from "@/lib/types/utils";

interface EditorProps {
  presentationId: string;
  user: User;
}

export default function EditorContainer({ presentationId, user }: EditorProps) {
  // For routing
  const router = useRouter();

  // State of the database saved presentation
  const {
    data: presentation, // Local or fetched presentation
    upsert: upsertPresentation,
    isLoading: isPresentationLoading,
    isLocal, // If using local draft
    isUpdating: isPresentationUpdating, // When saving is in progress
    error: presentationError,
  } = usePresentation({ presentationId, userId: user.id! });

  // Config of the canvas
  //const canvasConfig = useEditorStore((state) => state.canvasConfig);
  //const setCanvasConfig = useEditorStore((state) => state.setCanvasConfig);

  // Canvas content
  //const content = useEditorStore((state) => state.content);
  //const setContent = useEditorStore((state) => state.setContent);

  // Mutation to generate presentation
  const generateMutation = useGeneratePresentation({
    saveFn: (data) => {
      // Update on generated
      if (presentation) {
        upsertPresentation({
          ...presentation,
          created_by: user.id!,
          response: data,
          document: data,
        });
      }
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
    if (isLocal && presentation !== null) {
      if (!presentation.prompt) {
        // TODO: Fix this by opening a modal to enter prompt
        return router.push("/404");
      }

      // Start generating the presentation
      generateMutation.mutate({
        prompt: presentation.prompt,
      });
    }
  }, [
    presentation,
    router,
    generateMutation,
    generateMutation.isPending,
    generateMutation.isError,
    isPresentationLoading,
    presentationError,
    isLocal,
  ]);

  // useEffect(() => {
  //   // To resize the canvas
  //   const resize = () => {
  //     // Initializing the canvas config
  //     const canvasContainer = canvasContainerRef.current;

  //     // TODO: Get these values from presentation features
  //     // TODO: Create a utility to initialize presentation features

  //     if (!canvasContainer) return;

  //     const containerWidth = canvasContainer.clientWidth;

  //     const minWidth = 400; // Minimum width the canvas can take
  //     const width =
  //       containerWidth * 0.8 < minWidth ? minWidth : containerWidth * 0.8; // 80% of the container width
  //     const height = width / aspectRatioRef.current;

  //     setCanvasConfig({
  //       width: width,
  //       height: height,
  //       backgroundColor: "#ffffff",
  //     });
  //   };

  //   // Initial resize
  //   resize();

  //   // Adding resize event listener
  //   window.addEventListener("resize", resize);

  //   return () => {
  //     // To clean up the event listener
  //     window.removeEventListener("resize", resize);
  //   };
  // }, [setCanvasConfig]);

  return (
    <div
      id="editor"
      className="grid grid-cols-[200px_auto] w-full h-screen overflow-hidden"
    >
      <div id="slides-nav" className="flex flex-col gap-4 h-full">
        {/* {content.slides.map((slide, index) => (
              <Card key={index} className="cursor-pointer w-40 h-20"></Card>
          ))} */}
      </div>
      <div id="content" className="grid grid-rows-[80px_auto] gap-5 h-full p-4">
        <Titlebar user={user} title={"Sample Title"} />
        <div
          id="slide-editor"
          className="grid grid-cols-[auto_350px] gap-2 w-full h-full"
        >
          <div
            id="canvas-and-toolbar"
            className="w-full h-full grid grid-rows-[auto_100px]"
          >
            <div
              id="canvas-con tainer"
              ref={canvasContainerRef}
              className="w-full h-full flex flex-col items-center justify-center"
            ></div>
            <div id="toolbar-container">Toolbar</div>
          </div>
          <AIChat
            prompt={presentation?.prompt}
            isGenerating={generateMutation.isPending && isPresentationLoading}
            response={presentation?.response as GeneratedContent}
          />
        </div>
      </div>
    </div>
  );
}
