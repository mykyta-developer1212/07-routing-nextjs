"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/app/@modal/Modal";

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isError, isLoading } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: true
  });

  if (isLoading || isError || !note) return null;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={() => router.back()}>Close</button>
    </Modal>
  );
}