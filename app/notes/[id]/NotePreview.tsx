"use client";

import { useQuery } from "@tanstack/react-query";
import Modal from "@/app/@modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

interface NotePreviewProps {
  noteId: string;
  onClose: () => void;
}

export default function NotePreview({ noteId, onClose }: NotePreviewProps) {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    refetchOnMount: false,
  });

  if (isLoading || isError || !note) return null;

  return (
    <Modal onClose={onClose}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{new Date(note.createdAt).toLocaleDateString()}</p>
    </Modal>
  );
}