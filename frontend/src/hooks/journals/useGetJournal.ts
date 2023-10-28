import { useQuery } from "@tanstack/react-query";
import journalsService, { Journal } from "../../services/journalsService";

const useGetJournal = (id: string) => {
  return useQuery<Journal, Error>({
    queryKey: ["journals", id],
    queryFn: () => journalsService.get(id).then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 60 minutes
    keepPreviousData: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetJournal;
