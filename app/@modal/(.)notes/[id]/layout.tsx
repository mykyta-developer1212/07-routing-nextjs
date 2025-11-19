import { ReactNode, use } from "react";
import NotePreviewClient from "./NotePreview.client";

interface NotesLayoutProps {
  children: ReactNode;
  params: Promise<{ id: string }>; 
}

export default function NotesLayout({ children, params }: NotesLayoutProps) {
  const { id } = use(params); 

  return (
    <>
      {children}
      <NotePreviewClient id={id} />
    </>
  );
}
