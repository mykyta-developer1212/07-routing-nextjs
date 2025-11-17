"use client";

import { useState, useEffect } from "react";
import NotesList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/app/@modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [data, setData] = useState<FetchNotesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let isCancelled = false;

    async function loadNotes() {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await fetchNotes({ page, search: debouncedSearch, tag, perPage: 10 });
        if (!isCancelled) setData(res);
      } catch {
        if (!isCancelled) setIsError(true);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    loadNotes();

    return () => {
      isCancelled = true;
    };
  }, [page, debouncedSearch, tag]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Could not fetch the list of notes.</p>;

  return (
    <>
      <Pagination
        pageCount={data?.totalPages ?? 1}
        currentPage={page}
        onPageChange={setPage}
      />

      <SearchBox value={search} onChange={setSearch} />

      <button onClick={openModal} style={{ margin: "1rem 0" }}>
        Create note
      </button>

      <NotesList notes={data?.notes ?? []} />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} />
        </Modal>
      )}
    </>
  );
}