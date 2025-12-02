"use client";

import type { Note } from "@/types/note";

interface NoteDetailsClientProps {
  note: Note;
}

export default function NoteDetailsClient({ note }: NoteDetailsClientProps) {
  if (!note) return null; 

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{new Date(note.createdAt).toLocaleDateString()}</p>
    </div>
  );
}