"use client";

import { Typewriter } from "@/components/ui/typewriter";
import { TextAreaWithButton } from "@/components/ui/textarea-with-button";
import { useCallback, useEffect, useRef } from "react";
import { redirect, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { createPresentation, type PresentationInsert } from "@/lib/utils";

export default function Prompt({ userId }: { userId?: string }) {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const supabase = createClient();
  const mutation = useMutation({
    mutationFn: async (data: PresentationInsert) => {
      return createPresentation(supabase, data);
    },

    onSuccess: (data) => {
      const id = data[0].id;
      // Clearing out the session
      router.push(`/editor/${id}`);
    },

    onError: () => {
      console.log("Error while creating the presentation");
    },

    onSettled: () => {
      localStorage.removeItem("prompt");
    }
  });

  useEffect(() => {
    if (localStorage.getItem("prompt")) {
      mutation.mutate({
        prompt: localStorage.getItem("prompt"),
        created_by: userId,
      });
    }
  }, []);

  const onGenerate = useCallback(() => {
    if (!promptRef.current) return;
    // No generation for un authenticated users

    if (!userId) {
      // Save the prompt and redirect to sign in page
      localStorage.setItem("prompt", promptRef.current.value);
      router.push("/auth/signin");
    }

    mutation.mutate({
      prompt: promptRef.current.value,
      created_by: userId,
    });
  }, []);

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
