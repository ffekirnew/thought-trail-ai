import { useQuery } from "@tanstack/react-query";
import collectionsService, { Collection } from "../../services/collectionsService";

const useGetCollection = (id: string) => {
  return useQuery<Collection, Error>({
    queryKey: ["collections", id, "notes"],
    queryFn: () => collectionsService.get(id).then(res => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    keepPreviousData: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,

  });
}

export default useGetCollection;
