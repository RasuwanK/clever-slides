"use client";

//import { useEditorStore } from "@/stores/editor-store";
import { Stage, Layer, Rect } from "react-konva";
import type { User } from "@/components/ui/auth-status";
import { usePresentation } from "@/hooks/use-presentation";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGeneratePresentation } from "@/hooks/use-generate-presentation";
import { Titlebar } from "@/app/editor/[slideId]/titlebar";
import { AIChat } from "./ai-chat";
import { GeneratedContent } from "@/lib/types/utils";
import { useDocument } from "@/hooks/use-document";
import { useChat } from "@/hooks/use-chat";

interface EditorProps {
  presentationId: string;
  user: User;
}

export default function Editor({ presentationId, user }: EditorProps) {
  // For routing
  const router = useRouter();

  // State of the database saved presentation
  const presentation = usePresentation({ presentationId, userId: user.id! });

  // State of the database saved document
  const document = useDocument({});

  // State of the database saved chat
  const { chat, messages } = useChat({});

  // Config of the canvas
  //const canvasConfig = useEditorStore((state) => state.canvasConfig);
  //const setCanvasConfig = useEditorStore((state) => state.setCanvasConfig);

  // Canvas content
  //const content = useEditorStore((state) => state.content);
  //const setContent = useEditorStore((state) => state.setContent);

  // Mutation to generate presentation
  const generateMutation = useGeneratePresentation({
    saveFn: (data) => {
      if (!chat.data) {
        throw new Error("No chat has created");
      }

      const messageId = crypto.randomUUID();

      messages.upsert({
        id: messageId,
        chat: chat.data.id,
        message: data,
        role: "agent",
        sent_by: user.id,
      });
    },
  });

  // To get reference to the canvas parent
  const canvasContainerRef = useRef<HTMLDivElement>(null);

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
      className="grid grid-cols-1 grid-rows-[90vh_10vh] lg:grid-rows-1 lg:grid-cols-[200px_auto] w-full h-screen overflow-hidden"
    >
      <div
        id="slides-nav"
        className="row-start-2 row-end-3 lg:row-start-1 lg:row-end-2 flex flex-col gap-4 h-full"
      >
        {/* {content.slides.map((slide, index) => (
              <Card key={index} className="cursor-pointer w-40 h-20"></Card>
          ))} */}
      </div>
      <div
        id="content"
        className="row-start-1 row-end-2 lg:row-start-1 lg:row-end-2 grid grid-rows-[60px_auto] lg:grid-rows-[80px_auto] gap-5 md:gap-2 h-full p-4"
      >
        <Titlebar user={user} title={"Sample Title"} />
        <div
          id="slide-editor"
          className="grid grid-cols-1 sm:grid-cols-[auto_350px] gap-2 w-full h-full"
        >
          <div
            id="canvas-and-toolbar"
            className="w-full h-full grid grid-rows-[auto_100px]"
          >
            <div
              id="canvas-container"
              ref={canvasContainerRef}
              className="w-full h-full flex flex-col items-center justify-center"
            ></div>
            <div id="toolbar-container">Toolbar</div>
          </div>
          <AIChat
            prompt={presentation?.prompt}
            isGenerating={
              isPresentationLoading ||
              isPresentationUpdating ||
              generateMutation.isPending
            }
            generateFn={({
              updatePrompt,
              currentSlide,
            }: {
              updatePrompt: string;
              currentSlide: string;
            }) => {
              generateMutation.mutate({
                updatePrompt,
                currentSlide,
              });
            }}
            response={presentation?.response as GeneratedContent}
          />
        </div>
      </div>
    </div>
  );
}
