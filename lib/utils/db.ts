import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database.types";
import type {
  DocumentInsert,
  GeneratedContent,
  PresentationDraft,
  PresentationInsert,
  PresentationRow,
  ChatInsert,
  MessageInsert,
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
    return null;
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
    .select("*")
    .eq("id", data.presentationId)
    .eq("created_by", data.userId)
    .maybeSingle();

  if (error) {
    return null;
  }
  if (resData === null) {
    return null;
  }

  // Now 'content' is strictly typed as 'Content'
  return resData;
}

export async function upsertPresentation(
  client: SupabaseClient<Database>,
  data: {
    updates: PresentationInsert;
  },
) {
  const { data: resData, error } = await client
    .from("Presentation")
    .upsert({ ...data.updates })
    .select("id, created_by, updated_at")
    .maybeSingle();

  if (error) return null;
  if (resData === null) return null;

  return resData;
}

export async function upsertDocument(
  client: SupabaseClient<Database>,
  data: {
    document: DocumentInsert;
  },
) {
  const { data: resData, error } = await client
    .from("Documents")
    .upsert({
      ...data.document,
    })
    .select("*")
    .maybeSingle();

  if (error) return null;
  if (resData === null) return null;

  return resData;
}

export async function getDocument(
  client: SupabaseClient<Database>,
  data: {
    presentationId: string;
  },
) {
  const { data: resData, error } = await client
    .from("Documents")
    .select("*")
    .eq("belongs_to", data.presentationId)
    .maybeSingle();

  if (error) return null;
  if (resData === null) return null;

  return resData;
}

export async function upsertChat(
  client: SupabaseClient<Database>,
  data: {
    chat: ChatInsert;
  },
) {
  const { data: chat, error } = await client
    .from("Chat")
    .upsert({
      ...data.chat,
    })
    .select("*")
    .maybeSingle();

  if (error) return null;
  if (chat === null) return null;

  return chat;
}

export async function getChat(
  client: SupabaseClient<Database>,
  data: {
    presentationId: string;
  },
) {
  const { data: chat, error: chatError } = await client
    .from("Chat")
    .select("id, belongs_to, main_prompt, created_at")
    .eq("belongs_to", data.presentationId)
    .maybeSingle();

  if (chatError) {
    console.error("No chat found");
    return null;
  }
  if (chat === null) return null;

  const { data: messages, error: messagesError } = await client
    .from("Messages")
    .select("*")
    .eq("chat", chat.id)
    .order("created_at", {
      ascending: true,
    });

  if (messagesError) {
    return null;
  }

  return {
    ...chat,
    messages: messages === null ? [] : messages,
  };
}

export async function saveMessage(
  client: SupabaseClient<Database>,
  data: {
    message: MessageInsert;
  },
) {
  const { data: resData, error } = await client
    .from("Messages")
    .upsert({
      ...data.message
    })
        .select("*")
    .maybeSingle();

  if (error) return null;
  if (resData === null) return null;

  return resData;
}

export async function initPresentation() {}
