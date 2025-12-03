import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"; 
import NoteCreateClient from "./NoteCreate.client";

interface NoteCreateModalPageProps {
  onClose: () => void;
}

export default function NoteCreateModalPage({ onClose }: NoteCreateModalPageProps) {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteCreateClient onClose={onClose} />
    </HydrationBoundary>
  );
}