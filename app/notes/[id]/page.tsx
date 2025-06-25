import { QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "../[id]/NoteDetails.client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: { id: string };
};

const NoteDetails = async ({ params }: Props) => {
  const queryClient = new QueryClient()

  const noteId = Number(params.id);

  
  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <div>
      <h1>NoteDetails</h1>
      <br />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </div>
  )
}
export default NoteDetails;

