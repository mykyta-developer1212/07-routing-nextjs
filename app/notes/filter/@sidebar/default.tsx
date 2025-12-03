"use client";

import SidebarNotes from "./SidebarNotes";
import type { NoteTag } from "@/types/note";

export default function SidebarDefault() {
  const tags: NoteTag[] = ["Work", "Personal", "Todo", "Meeting", "Shopping"];

  return <SidebarNotes tags={tags} />;
}