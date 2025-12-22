export default async function SlidePage({ params }: { params: { slideId: string } }) {
    return <div>Slide ID: {params.slideId}</div>;
}