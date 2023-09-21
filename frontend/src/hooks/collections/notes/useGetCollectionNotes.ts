import { collectionsService } from "../../../services";
import { Note } from "../../../services/notesService";
import { useQuery } from "@tanstack/react-query";

const useGetCollectionNotes = (collectionSlug: string) => {
  return useQuery<Note[], Error>({
    queryKey: ["collections", collectionSlug, "notes"],
    queryFn: () => collectionsService.getNotes(collectionSlug).then(res => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    keepPreviousData: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}

export default useGetCollectionNotes;
