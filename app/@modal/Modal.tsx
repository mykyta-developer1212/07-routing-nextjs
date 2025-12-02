"use client";

import { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button className={styles.closeBtn} onClick={onClose}>
        </button>
        {children}
      </div>
    </div>
  );
}