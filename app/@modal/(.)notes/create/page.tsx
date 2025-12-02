import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NoteCreateClient from "./NoteCreate.client";

export default function NoteCreateModalPage() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteCreateClient />
    </HydrationBoundary>
  );
}