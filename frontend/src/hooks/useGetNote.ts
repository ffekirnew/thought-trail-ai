import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "../services/apiClient";
import notesService, { Note } from "../services/notesService";

const useGetNote = (id: string) => {
  return useQuery<FetchResponse<Note>, Error>({
    queryKey: ["notes", id],
    queryFn: () => notesService.getDetails(id),
  });
}

export default useGetNote;
