import { collectionsService } from "../../../services";
import { FetchResponse } from "../../../services/apiClient";
import { Note } from "../../../services/notesService";
import { useQuery } from "@tanstack/react-query";

const useGetCollectionNote = (collectionSlug: string, noteId: string) => {
  return useQuery<FetchResponse<Note>, Error>({
    queryKey: ["collections", collectionSlug, "notes", noteId],
    queryFn: () => collectionsService.getNote(collectionSlug, noteId),
  });
}

export default useGetCollectionNote;
