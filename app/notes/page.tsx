import css from "../notes/NotesPage.module.css";
import NotesClient from './Notes.client';
import { getNotes } from '../../lib/api'
import type { NotesResponse } from '../../types/note';

export default async function NotesPage() {
  // Запит під час серверного рендерингу
  const initialData: NotesResponse = await getNotes('', 1);

  return (
    <div>
      <h2 className={css.title}>Notes</h2>
      <NotesClient initialData={initialData} />
    </div>
  );
}