export default async function EditorPage({
    params
}: {
    params: Promise<{slideId: string}>
}) {
    const {slideId} = await params;
    return (
        <div>
            <main></main>
        </div>
    )
}