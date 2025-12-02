import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "../NoteDetailsClient";

interface NoteDetailsPageProps {
  params: { id: string };
  searchParams?: { fullscreen?: string };
}

export default async function NoteDetailsPage({ params, searchParams }: NoteDetailsPageProps) {
  const { id } = params;

  if (!searchParams?.fullscreen) {
    return <></>;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary key={id} state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}