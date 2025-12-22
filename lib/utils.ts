import { clsx, type ClassValue } from "clsx"
import { cache } from "react";
import { twMerge } from "tailwind-merge"
import { createClient } from "./supabase/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function generatePresentation() {
  const response = await fetch("/api/generate", {
    method: "POST",
    body: JSON.stringify({
      topic: "AI in Education",
      audience: "University students",
      slides: 5,
    })
  });

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let streamedText = "";

  while(true) {
    const {value, done} = await reader.read();

    if(done) break;

    streamedText += decoder.decode(value)
    

    // UI update goes here
    console.log(streamedText);
  }

  const parsed = JSON.parse(streamedText);
  
  // set parsed slides here
}