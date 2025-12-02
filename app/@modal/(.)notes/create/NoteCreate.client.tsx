"use client";

import Modal from "@/app/@modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useRouter } from "next/navigation";

export default function NoteCreateClient() {
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <Modal onClose={handleClose}>
      <NoteForm onSuccess={handleClose} onCancel={handleClose} />
    </Modal>
  );
}