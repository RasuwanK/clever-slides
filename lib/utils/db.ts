import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database.types";
import type {
  DocumentInsert,
  GeneratedContent,
  PresentationDraft,
  PresentationInsert,
  PresentationRow,
  ChatInsert,
} from "@/lib/types/utils";

export async function generatePresentation(
  payload:
    | {
        prompt: string;
      }
    | { updatePrompt: string; currentSlide: string },
): Promise<GeneratedContent> {
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

// export async function createPresentation(
//   client: SupabaseClient<Database>,
//   data: PresentationInsert,
// ): Promise<PresentationDraft> {
//   const res = await client
//     .from("Presentation")
//     .upsert([{ ...data }])
//     .select();

//   // Error while creating the presentation
//   if (res.error) {
//     throw new Error(JSON.stringify(res.error));
//   }

//   if (!res.data) {
//     throw new Error("NOT_FOUND");
//   }

//   return res.data[0];
// }

export async function getRecentPresentations(
  client: SupabaseClient<Database>,
  data: {
    userId: string | undefined;
  },
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

export async function getPresentation(
  client: SupabaseClient<Database>,
  data: {
    presentationId: string;
    userId: string;
  },
) {
  const { data: resData, error } = await client
    .from("Presentation")
    .select("id, created_by, updated_at ,prompt")
    .eq("id", data.presentationId)
    .eq("created_by", data.userId);

  if (error) throw new Error("Error while getting presentation");

  if (resData.length === 0) {
    console.log("No presentation found");
    return null;
  }

  // Now 'content' is strictly typed as 'Content'
  return resData[0] as PresentationRow;
}

export async function upsertPresentation(
  client: SupabaseClient<Database>,
  data: {
    presentationId: string;
    userId: string;
    updates: PresentationInsert;
  },
) {
  const { data: resData, error } = await client
    .from("Presentation")
    .upsert({ ...data.updates })
    .eq("id", data.presentationId)
    .eq("created_by", data.userId)
    .select("id, created_by, updated_at ,prompt, theme")
    .single();

  if (resData === null) {
    console.log("No presentation found");
    return null;
  }

  if (error) throw new Error("Error while updating presentation");

  return resData;
}

export async function upsertDocument(
  client: SupabaseClient<Database>,
  data: {
    presentationId: string;
    document: DocumentInsert;
  },
) {
  const { data: resData, error } = await client
    .from("Documents")
    .upsert({
      ...data.document,
    })
    .eq("belongs_to", data.presentationId)
    .select("*")
    .single();

  if (resData === null) {
    console.log("No document found");
    return null;
  }

  if (error) throw new Error("Error while creating the document");

  return resData;
}

export async function upsertChat(
  client: SupabaseClient<Database>,
  data: {
    presentationId: string;
    chat: ChatInsert;
  },
) {
  const { data: resData, error } = await client
    .from("Chat")
    .upsert({
      ...data.chat,
    })
    .eq("presentation", data.presentationId)
    .select("*")
    .single();

  if (resData === null) {
    console.log("No chat found");
    return null;
  }

  if (error) throw new Error("Error while creating the document");

  return resData;
}

export async function saveMessage(
  client: SupabaseClient<Database>,
  data: {
    chatId: string;
    sentBy: string;
  },
) {}
