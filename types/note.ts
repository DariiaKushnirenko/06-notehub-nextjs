export interface Note {
  tag: string;
  id: number;
  title: string;
  content: string;
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
