import { QueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation';
import { getPresentation } from '@/lib/utils';
import EditorContainer from '../editor-container';

export default async function EditorPage({
  params
}: {
  params: Promise<{ slideId: string }>
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { slideId } = await params;
  const queryClient = new QueryClient();

  if (!user) redirect('/auth/signin')

  // loading the presentation prior to page load
  await queryClient.prefetchQuery({
    queryKey: ["getPresentation"],
    queryFn: () => getPresentation(supabase, {
      presentationId: slideId,
      userId: user.id
    })
  });

  return (
    <div className="flex flex-col">
      <main className="h-screen">
        <EditorContainer presentationId={slideId} userId={user.id} />
      </main>
    </div>
  )
}
