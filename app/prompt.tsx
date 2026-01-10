"use client";

import { Typewriter } from "@/components/ui/typewriter";
import { TextAreaWithButton } from "@/components/ui/textarea-with-button";
import { RefObject } from "react";

interface PromptProps {
  userId?: string | undefined;
  ref: RefObject<HTMLTextAreaElement | null>;
  onGenerate: () => void;
}

export default function Prompt({ userId, ref, onGenerate }: PromptProps) {
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
          ref={ref}
          onClick={onGenerate}
          placeholder="Create a professional presentation for a pitch deck about an AI startup"
        />
      </div>
    </>
  );
}
