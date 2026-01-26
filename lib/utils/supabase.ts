import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/database.types";

export type PresentationRow =
  Database["public"]["Tables"]["Presentation"]["Row"];
export type PresentationInsert =
  Database["public"]["Tables"]["Presentation"]["Insert"];
export type PresentationUpdate =
  Database["public"]["Tables"]["Presentation"]["Update"];

export type PresentationDraft = Pick<Database["public"]["Tables"]["Presentation"]["Row"], "id" | "created_at" | "content" | "prompt">;

export interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar_url?: string;
};

export interface GeneratedContent {
  title: string;
  theme: {
    accentColor: string;
    background: "light" | "dark";
  },
  slides: [
    {
      layout: "title_center" | "title_left_bullets_right" | "title_top_bullets_bottom" | "two_column";
      title: string;
      bullets: string[];
    }
  ]
}

export async function generatePresentation(payload: {
  prompt: string;
}) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log(response);

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
): Promise<PresentationDraft> {
  const res = await client
    .from("Presentation")
    .upsert([{ ...data }])
    .select();

  // Error while creating the presentation
  if (res.error) {
    throw new Error(JSON.stringify(res.error));
  }

  if (!res.data) {
    throw new Error("NOT_FOUND");
  }

  return res.data[0];
}

export async function getRecentPresentations(
  client: SupabaseClient<Database>,
  data: {
    userId: string | undefined;
  }
) {
  if (!data.userId) {
    return null;
  }

  const res = await client
    .from("Presentation")
    .select("id,created_at,content,prompt")
    .eq("created_by", data.userId);

  if (res.error) {
    throw new Error("Error while getting presentations");
  }

  return res.data;
}

// 1. The Type Guard
// Replace 'slides' with a unique property that exists in your Content type
function isContent(json: unknown): json is GeneratedContent {
  return (
    json !== null &&
    typeof json === 'object' &&
    'slides' in json &&
    Array.isArray(json.slides)
  );
}

export async function getPresentation(
  client: SupabaseClient<Database>,
  data: {
    presentationId: string;
    userId: string;
  }
) {
  const { data: resData, error } = await client
    .from("Presentation")
    .select("id, content, created_by, updated_at ,prompt, theme")
    .eq("id", data.presentationId)
    .eq("created_by", data.userId);

  if (error) throw new Error("Error while getting presentation");
  
  if (resData.length === 0) {
    console.log("No presentation found");
    return null;
  };

  // 2. Apply the Guard
  const content = resData[0].content;

  // When no content is available
  if (!isContent(content)) {
    throw new Error("INVALID_CONTENT_STRUCTURE");
  }

  // Now 'content' is strictly typed as 'Content'
  return resData[0] as PresentationRow;
}

export async function updatePresentation(
  client: SupabaseClient<Database>,
  data: {
    presentationId: string;
    userId: string;
    updates: PresentationUpdate;
  }
) {
  const { data: resData, error } = await client
    .from("Presentation")
    .update({ ...data.updates })
    .eq("id", data.presentationId)
    .eq("created_by", data.userId)
    .select("id, content, created_by, updated_at ,prompt, theme")
    .single();

  if (error) throw new Error("Error while updating presentation");

  if (!resData) {
    return null;
  }

  const content = resData.content;

  if (!isContent(content)) {
    throw new Error("INVALID_CONTENT_STRUCTURE");
  }

  return {
    ...resData,
    content: content,
  };
}
