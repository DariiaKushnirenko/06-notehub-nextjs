"use client";

import { useState } from "react";
import { getNotes } from "../lib/api";
import { Note } from "../types/note";
import NoteList from "../components/NoteList/NoteList";

const Notes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
  
    const handleClick = async () => {
        const search = ""; 
        const page = 1; 
        const response = await getNotes(search, page);
        if (response?.notes) {
          setNotes(response.notes);
        }
      };
  
    return (
      <section>
        <h1>Notes List</h1>
        <button onClick={handleClick}>Get my notes</button>
        {notes.length > 0 && <NoteList notes={notes} />}
      </section>
    );
  }
  
  export default Notes;