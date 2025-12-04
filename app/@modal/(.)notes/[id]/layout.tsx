import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import NotePreviewClient from "./NotePreview.client";

interface ModalLayoutProps {
  children: ReactNode;
}

export default function ModalLayout({ children }: ModalLayoutProps) {
  const pathname = usePathname();

  const id = pathname.split("/").pop();

  return (
    <>
      {children}
      {id && <NotePreviewClient noteId={id} />}
    </>
  );
}