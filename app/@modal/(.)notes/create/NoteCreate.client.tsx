"use client";

import NoteForm from "@/components/NoteForm/NoteForm";

interface NoteCreateProps {
  onClose: () => void;
}

export default function NoteCreateClient({ onClose }: NoteCreateProps) {
  return <NoteForm onSuccess={onClose} onClose={onClose} />;
}