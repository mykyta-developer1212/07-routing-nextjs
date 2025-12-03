"use client";

import NotePreviewClient from "@/app/notes/[id]/NotePreview";
import { useRouter, useSearchParams } from "next/navigation";

export default function NoteModalWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");

  if (!noteId) return null;

  const handleClose = () => router.back();

  return <NotePreviewClient noteId={noteId} onClose={handleClose} />;
}
