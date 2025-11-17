import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function NotesLayout({ children, sidebar }: LayoutProps) {
  return (
    <>
      {sidebar}
      {children}
    </>
  );
}
