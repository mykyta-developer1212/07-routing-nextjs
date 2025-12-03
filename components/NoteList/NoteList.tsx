"use client";

import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onViewNote?: (noteId: string) => void;
  onDelete?: (noteId: string) => void;
}

export default function NoteList({ notes, onViewNote, onDelete }: NoteListProps) {
  if (!notes.length) return <p className={css.empty}>No notes found.</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.link} onClick={() => onViewNote?.(note.id)}>View details</button>
            <button className={css.button} onClick={() => onDelete?.(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}