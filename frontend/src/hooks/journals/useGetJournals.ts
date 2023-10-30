import { useQuery } from "@tanstack/react-query";
import journalsService, { Journal } from "../../services/journalsService";
import useJournalQueryStore from "../../state/journalQueryStore";

const useGetJournals = () => {
  const journalQuery = useJournalQueryStore((s) => s.journalQuery);

  return useQuery<Journal[], Error>({
    queryKey: ["journals", journalQuery],
    queryFn: () =>
      journalsService
        .getAll({
          ordering: journalQuery.ordering,
          orderBy: journalQuery.orderBy,
        })
        .then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 60 minutes
    keepPreviousData: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetJournals;
