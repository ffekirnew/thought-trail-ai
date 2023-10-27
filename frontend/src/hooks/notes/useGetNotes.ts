import { useQuery } from "@tanstack/react-query"
import { FetchResponse } from "../../services/apiClient"
import notesService, { Note } from "../../services/notesService"

const useGetNotes = () => {
  return useQuery<FetchResponse<Note[]>, Error>({
    queryKey: ["notes"],
    queryFn: () => notesService.getAll(),
  })
}

export default useGetNotes
