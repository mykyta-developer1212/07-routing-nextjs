import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({ params }: NotePageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}