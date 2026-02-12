import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Editor from "@/app/editor/[slideId]/editor";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ slideId: string }>;
}) {
  // For authentication and getting user info
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { slideId } = await params;

  if (!user) redirect("/auth/signin");

  return (
    <main className="flex flex-col w-full h-screen">
      <Editor
        presentationId={slideId}
        user={{
          id: user.id,
          email: user.email!,
          name: user.user_metadata.full_name,
          avatarUrl: user.user_metadata.avatar_url,
        }}
      />
    </main>
  );
}
