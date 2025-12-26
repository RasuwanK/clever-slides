import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
