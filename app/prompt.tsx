"use client";

import { TextAreaWithButton } from "@/components/ui/textarea-with-button";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDraftStore } from "@/stores/draft-store";
interface PromptProps {
  userId?: string;
}

export default function Prompt({ userId }: PromptProps) {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { draft, setDraft } = useDraftStore();

  useEffect(() => {
    // Automatically redirecting when draft is available
    if (draft !== null) {
      router.push("/");
    }
  }, []);

  const onClick = () => {
    if (!promptRef.current) return;
    // No generation for un authenticated users
    const draftId = crypto.randomUUID();

    if (!userId) {
      // Save the prompt and redirect to sign in page
      router.push("/auth/signin");
      return;
    }

    // Save draft locally
    setDraft({
      id: draftId,
      prompt: promptRef.current.value,
      content: null,
      created_at: new Date().toISOString(),
      updated_at: null,
      is_deleted: false,
      status: "draft",
      created_by: userId,
      theme: null,
    });

    // Redirect to regenerate
    router.push("/editor/" + draftId);
  };

  return (
    <TextAreaWithButton
      ref={promptRef}
      onClick={onClick}
      placeholder="Create a professional presentation for a pitch deck about an AI startup"
    />
  );
}
