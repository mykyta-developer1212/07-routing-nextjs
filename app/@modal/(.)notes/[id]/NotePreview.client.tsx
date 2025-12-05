"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/app/@modal/Modal";

interface NotePreviewProps {
  noteId: string;
  onClose?: () => void;
}

export default function NotePreviewClient({ noteId, onClose }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isError, isLoading } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const close = () => {
    if (onClose) onClose();
    else router.back();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note.</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <Modal onClose={close}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>

      {note.tag && (
        <p>
          <strong>Tag:</strong> {note.tag}
        </p>
      )}

      {note.createdAt && (
        <p>
          <strong>Created:</strong> {new Date(note.createdAt).toLocaleString()}
        </p>
      )}

      <button onClick={close}>Close</button>
    </Modal>
  );
}