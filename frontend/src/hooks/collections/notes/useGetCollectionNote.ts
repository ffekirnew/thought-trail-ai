import { collectionsService } from "../../../services";
import { Note } from "../../../services/notesService";
import { useQuery } from "@tanstack/react-query";

const useGetCollectionNote = (collectionSlug: string, noteId: string) => {
  return useQuery<Note, Error>({
    queryKey: ["collections", collectionSlug, "notes", noteId],
    queryFn: () =>
      collectionsService
        .getNote(collectionSlug, noteId)
        .then((res) => res.data),
  });
};

export default useGetCollectionNote;
