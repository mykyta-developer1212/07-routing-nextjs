"use client";

import { ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NotePreviewClient from "./NotePreview.client";

interface NotesLayoutProps {
  children: ReactNode;
}

export default function NotesLayout({ children }: NotesLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); 

  const closeModal = () => {
    router.back();
  };

  return (
    <>
      {children}
      {id && <NotePreviewClient noteId={id} onClose={closeModal} />}
    </>
  );
}