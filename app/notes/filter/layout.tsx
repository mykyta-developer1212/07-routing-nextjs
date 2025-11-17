import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function NotesLayout({ children, sidebar }: LayoutProps) {
  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      alignItems: "flex-start"
    }}>
      <aside style={{ width: "250px", flexShrink: 0 }}>
        {sidebar}
      </aside>

      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
    </div>
  );
}