"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NotesList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/app/@modal/Modal";
import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import NoteForm from "@/components/NoteForm/NoteForm"; 
import { fetchNotes, deleteNote, FetchNotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import css from "@/components/NoteList/NoteList.module.css";

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState<string | "create" | null>(null);

  const queryClient = useQueryClient();

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 10,
        search: debouncedSearch,
        tag,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const openNoteModal = (noteId: string) => setSelectedNoteId(noteId);
  const closeNoteModal = () => setSelectedNoteId(null);
  const openCreateModal = () => setSelectedNoteId("create");

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <SearchBox value={search} onChange={handleSearchChange} />
        <button className={css.button} onClick={openCreateModal}>
          Create note
        </button>
      </div>

      {isError && <p>Could not fetch notes.</p>}

      {data?.notes?.length ? (
        <NotesList
          notes={data.notes}
          onViewNote={openNoteModal}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      ) : (
        <p>No notes found</p>
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          pageCount={data.totalPages}
          onPageChange={setPage}
        />
      )}

      {selectedNoteId && selectedNoteId !== "create" && (
        <Modal onClose={closeNoteModal}>
          <NotePreviewClient noteId={selectedNoteId} onClose={closeNoteModal} />
        </Modal>
      )}

      {selectedNoteId === "create" && (
        <Modal onClose={closeNoteModal}>
          <NoteForm onClose={closeNoteModal} />
        </Modal>
      )}
    </div>
  );
}