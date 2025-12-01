"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import NotesList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/app/@modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "@/components/NoteList/NoteList.module.css";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  // Скидання сторінки на 1 відразу при зміні пошуку
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 10,
        search: debouncedSearch,
        tag,
      }),
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          pageCount={data.totalPages}
          onPageChange={setPage}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <SearchBox value={search} onChange={handleSearchChange} />
        <button onClick={openModal} className={css.button}>
          Create note
        </button>
      </div>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Could not fetch notes.</p>}

      {data?.notes?.length ? (
        <NotesList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}