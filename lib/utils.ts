import { SupabaseClient } from "@supabase/supabase-js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Database } from "./supabase/database.types";

export type PresentationRow = Database["public"]["Tables"]["Presentation"]["Row"]
export type PresentationInsert = Database["public"]["Tables"]["Presentation"]["Insert"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generatePresentation(payload: {
  topic: string;
  audience: string;
  slides: number;
}) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Error while generating presentation");
  }

  let responseJSON;
  try {
    responseJSON = await response.json();
  } catch (error) {
    throw new Error("Error while converting API response to JSON");
  }

  return responseJSON;
}

export async function createPresentation(
  client: SupabaseClient<Database>,
  data: PresentationInsert
) {
  const res = await client
    .from("Presentation")
    .insert([{ ...data }]).select();

  // Error while creating the presentation
  if(res.error) {
    throw new Error("Error while creating an empty presentation");
  }
  
  return res.data;
}
