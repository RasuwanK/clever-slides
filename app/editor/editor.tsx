"use client";

import { createClient } from "@/lib/supabase/client"
import { generatePresentation, getPresenstation } from "@/lib/utils"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface EditorProps {
  presentationId: string;
  userId: string;
}

export default function Editor({ presentationId, userId }: EditorProps) {
  const router = useRouter();
  const supabase = createClient();

  // To fetch the relevant presentation details
  // Prompt other details are taken from here
  const { data, isLoading, error } = useQuery({
    queryKey: ["presentation"],
    queryFn: () => getPresenstation(supabase, {
      presentationId,
      userId
    })
  });

  const [schema, setSchema] = useState({});

  //if (!data) return router.push("/404");

  // When no prompt is found
  // TODO: Allows manual slide creation when prompt is not found
  //if (!data[0].prompt) return router.push("/");

  // For generating the presentations
  const mutation = useMutation({
    mutationKey: ["generatePresentation"],
    mutationFn: (payload: { prompt: string }) => generatePresentation(payload),
    onSuccess: (data) => {
      console.log(data);
      setSchema(data);
    },
    onError: () => {
      console.log("Error while generatePresentation");
    }
  });

  // Redirect user to not found for presentations which are empty
  useEffect(() => {
    if (!data && !isLoading) {
      // No data is available after loading
      router.push("/404");
    } else if (!isLoading && data) {
      // No loading and data is available
      const presentation = data[0];
      if (!presentation.content) {
        // No prompt is saved at home page
        if (!presentation.prompt) throw new Error("No prompt has created on home page");

        // Autogenerating the presentation
        mutation.mutate({
          prompt: presentation.prompt
        });
      }
    }
  }, [data, isLoading]);

  return (
    <div id="editor">
      <aside id="slides-nav"></aside>
      <div id="main">
        <header id="top-bar"></header>
      </div>
    </div>
  )
}
