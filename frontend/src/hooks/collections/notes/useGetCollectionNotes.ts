import { collectionsService } from "../../../services";
import { FetchResponse } from "../../../services/apiClient";
import { Note } from "../../../services/notesService";
import { useQuery } from "@tanstack/react-query";

const useGetCollectionNotes = (collectionSlug: string) => {
  return useQuery<FetchResponse<Note[]>, Error>({
    queryKey: ["collections", collectionSlug],
    queryFn: () => collectionsService.getNotes(collectionSlug),
  });
}

export default useGetCollectionNotes;
