"use client";

import { Typewriter } from "@/components/ui/typewriter";
import { TextAreaWithButton } from "@/components/ui/textarea-with-button";
import { useGeneratePresentation } from "@/components/ui/hooks/use-generate-presentation";
import { useCallback, useRef } from "react";

export default function Prompt() {
  const generate = useGeneratePresentation();
  const promptRef = useRef<HTMLTextAreaElement>(null);

  const onGenerate = useCallback(() => {
    if(promptRef.current) {
        generate.mutate({
            topic: promptRef.current.value,
            audience: "Formal Audience",
            slides: 5
        }, {
            onSuccess: (data) => {
                console.log("Done: ", data);
            },
            onError: (error) => {
                console.log("Error: ", error);
            }
        });
    }
  }, [generate]);

  return (
    <>
      <div id="promt-dialog" className="mt-[calc(30vh)] flex flex-col gap-10">
        <header className="flex flex-col items-center gap-5">
          <Typewriter
            text="Think. Type. Create"
            className="text-6xl font-bold text-primary"
          />
          <p className="text-xl">Create presentations with a single prompt</p>
        </header>
          <TextAreaWithButton
            ref={promptRef}
            onClick={onGenerate}
            placeholder="Create a professional presentation for a pitch deck about an AI startup"
          />
        <div id="drafts" className="mt-10 flex flex-col gap-4 items-center">
            <h1>Recents</h1>
            <div className="grid grid-cols-3 gap-4"></div>
          </div>
      </div>
    </>
  );
}
