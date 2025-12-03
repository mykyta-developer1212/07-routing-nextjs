"use client";

import { ReactNode, useEffect } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
   <div className={styles.backdrop} onClick={handleOverlayClick} role="dialog" aria-modal="true">
    <div className={styles.modal}>
     <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
      ✕
     </button>
     {children}
    </div>
   </div>
  );
}