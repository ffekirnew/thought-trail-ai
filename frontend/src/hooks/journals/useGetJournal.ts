import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "../../services/apiClient";
import journalsService, { Journal } from "../../services/journalsService";

const useGetJournal = (id: string) => {
  return useQuery<FetchResponse<Journal>, Error>({
    queryKey: ["journals", id],
    queryFn: () => journalsService.get(id),
  });
}

export default useGetJournal;
