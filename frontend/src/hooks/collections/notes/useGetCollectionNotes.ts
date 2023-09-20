import { collectionsService } from "../../../services";
import { Note } from "../../../services/notesService";
import { useQuery } from "@tanstack/react-query";

const useGetCollectionNotes = (collectionSlug: string) => {
  return useQuery<Note[], Error>({
    queryKey: ["collections", collectionSlug, "notes"],
    queryFn: () => collectionsService.getNotes(collectionSlug).then(res => res.data),
  });
}

export default useGetCollectionNotes;
