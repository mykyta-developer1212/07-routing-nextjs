import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

interface NoteModalPageProps {
  params: { id: string };
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}