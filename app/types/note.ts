export type Note = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};


export interface NewNoteData {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  }
  
 
  export interface NotesResponse {
    notes: Note[];
    totalPages: number;
  }