import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const rawTag = slug?.[0];
  const tag = rawTag === "all" ? undefined : (rawTag as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 10,
        search: "",
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}