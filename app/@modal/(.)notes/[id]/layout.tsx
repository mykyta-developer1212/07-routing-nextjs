import { ReactNode } from "react";
import NotePreviewClient from "./NotePreview.client";

interface NotesLayoutProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export default async function NotesLayout({ children, params }: NotesLayoutProps) {
  const { id } = await params;

  return (
    <>
      {children}
      {id && <NotePreviewClient noteId={id} />}
    </>
  );
}