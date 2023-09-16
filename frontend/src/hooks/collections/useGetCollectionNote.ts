import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "../../services/apiClient";
import collectionsService from "../../services/collectionsService";
import { Note } from "../../services/notesService";

const useGetCollectionNote = (collectionSlug: string, noteId: string) => {
  return useQuery<FetchResponse<Note>, Error>({
    queryKey: ["collections", collectionSlug, "notes", noteId],
    queryFn: () => collectionsService.getNoteBySlug(collectionSlug, noteId),
  });
}

export default useGetCollectionNote;
