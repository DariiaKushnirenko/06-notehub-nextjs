
import css from "../notes/NotesPage.module.css";
import NotesClient from './Notes.client';

export default function NotesPage() {
  return (
    <div>   
      <h2 className={css.title}>Notes</h2>
      <NotesClient />
    </div>
  );
}
