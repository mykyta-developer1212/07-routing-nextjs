"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/app/@modal/Modal";
import { useRouter, usePathname } from "next/navigation";
import type { Note } from "@/types/note";
import styles from "@/app/notes/[id]/NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,  
  });

  const handleClose = () => {
    if (!pathname.includes("fullscreen")) router.back();
  };

  if (pathname.includes("fullscreen")) return null;

  if (isLoading)
    return (
      <Modal onClose={handleClose}>
        <p>Loading note...</p>
      </Modal>
    );

  if (isError || !data)
    return (
      <Modal onClose={handleClose}>
        <p>Note is unavailable.</p>
      </Modal>
    );

  return (
    <Modal onClose={handleClose}>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={handleClose}>
          Back
        </button>
        <div className={styles.item}>
          <div className={styles.header}>
            <h2>{data.title}</h2>
            {data.tag && <span className={styles.tag}>{data.tag}</span>}
          </div>
          <p className={styles.content}>{data.content}</p>
          <p className={styles.date}>
            Created: {new Date(data.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </Modal>
  );
}