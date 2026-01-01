"use client";

import { Typewriter } from "@/components/ui/typewriter";
import { TextAreaWithButton } from "@/components/ui/textarea-with-button";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useGeneratePresentation } from "@/hooks/use-generate-presentation";
import { usePresentationMutation } from "@/hooks/use-presentation-mutation";

export default function Prompt({ userId }: { userId?: string }) {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const supabase = createClient();
  const presentationMutation = usePresentationMutation({
    supabase,
  });
  const generateMutation = useGeneratePresentation();

  // Used when a presentation is created for the first time
  const createFresh = useCallback(async () => {
    if (!promptRef.current) return;

    const prompt = promptRef.current.value;

    // Create the draft
    const presentation = await presentationMutation.mutateAsync({
      prompt,
      created_by: userId,
    });

    const presentationId = presentation.id;

    // Generate the schema
    const schema = await generateMutation.mutateAsync({ prompt });

    // Update the content
    await presentationMutation.mutateAsync({
      id: presentationId,
      content: schema,
      theme: schema["theme"],
      created_by: userId
    });
  }, []);

  // Used for continuing generation after auth redirect
  useEffect(() => {
    if (!promptRef.current) return;

    // When coming from redirect of signin, presentation is created automatically
    if (sessionStorage.getItem("prompt") && userId) {
      createFresh();
    }
  }, []);

  const onGenerate = useCallback(() => {
    if (!promptRef.current) return;
    // No generation for un authenticated users

    if (!userId) {
      // Save the prompt and redirect to sign in page
      sessionStorage.setItem("prompt", promptRef.current.value);
      router.push("/auth/signin");
      return;
    }

    createFresh();
  }, [promptRef, userId, router]);

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
      </div>
    </>
  );
}
