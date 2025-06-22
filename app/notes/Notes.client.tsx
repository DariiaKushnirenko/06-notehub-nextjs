"use client";

import css from "../notes/NotesPage.module.css";

import { useState } from "react";
import { getNotes, deleteNote } from "../../lib/api";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import SearchBox from "../../components/SearchBox/SearchBox";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import NoteModal from "../../components/NoteModal/NoteModal";

import type { NotesResponse } from "../../types/note";


export default function NotesClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeSearch = debouncedSearchTerm.trim();

  const queryClient = useQueryClient();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const { data, isLoading, isError } = useQuery<NotesResponse, Error>({
    queryKey: ['notes', activeSearch, currentPage], 
    queryFn: () => getNotes(activeSearch, currentPage),
    placeholderData: keepPreviousData,
    enabled: true, 
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes", currentPage, debouncedSearchTerm],
      });
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
           
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isModalOpen && (
  <NoteModal onClose={() => setIsModalOpen(false)} />
)}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Request failed</p>}

      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      )}
    </div>
  );
}

