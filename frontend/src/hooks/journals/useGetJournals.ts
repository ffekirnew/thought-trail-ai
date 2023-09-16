import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "../../services/apiClient";
import journalsService, { Journal } from "../../services/journalsService";

const useGetJournals = () => {
  return useQuery<FetchResponse<Journal[]>, Error>({
    queryKey: ["journals"],
    queryFn: () => journalsService.getAll(),
  });
}

export default useGetJournals;
