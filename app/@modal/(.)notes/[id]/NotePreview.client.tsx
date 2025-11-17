"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/app/@modal/Modal";
import { useRouter } from "next/navigation";
import type { Note } from "@/types/note";

interface NotePreviewProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading note...</p>
      </Modal>
    );
  }

  if (isError || !data) {
    return (
      <Modal onClose={handleClose}>
        <p>Error loading note.</p>
        <button onClick={handleClose}>Close</button>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>Tag: <b>{data.tag}</b></p>
      <p>Created: {new Date(data.createdAt).toLocaleString()}</p>

      <button onClick={handleClose}>Close</button>
    </Modal>
  );
}