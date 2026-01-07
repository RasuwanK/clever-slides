"use client";

import Recents from "./recents";
import Prompt from "./prompt"
import { useRef, useCallback, useEffect } from "react";
import { useGeneratePresentation } from "@/hooks/use-generate-presentation";
import { useRouter } from "next/navigation";
import { usePresentationCreate } from "@/hooks/use-presentation-create";
import { useDrafts } from "@/hooks/use-drafts";

interface GenerateProps {
  userId: string | undefined;
}

export default function Generate({
  userId,
}: GenerateProps) {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const presentationMutation = usePresentationCreate({ userId });

  const generateMutation = useGeneratePresentation();

  // Used when a presentation is created for the first time
  const createFresh = async () => {
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
      created_by: userId,
    });
  }

  const onGenerate = () => {
    if (!promptRef.current) return;
    // No generation for un authenticated users

    if (!userId) {
      // Save the prompt and redirect to sign in page
      sessionStorage.setItem("prompt", promptRef.current.value);
      router.push("/auth/signin");
      return;
    }

    createFresh();
  }

  const { data, isLoading } = useDrafts({
    userId
  });

  // Used for continuing generation after auth redirect
  useEffect(() => {
    if (!promptRef.current) return;

    // When coming from redirect of signin, presentation is created automatically
    if (sessionStorage.getItem("prompt") && userId) {
      createFresh();
    }
  }, []);

  if (isLoading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div
      id="centered"
      className="flex flex-col gap-5 min-h-screen items-center"
    >
      <Prompt userId={userId} onGenerate={onGenerate} ref={promptRef} />
      {data && <Recents presentations={data} />}
    </div>
  )
}
