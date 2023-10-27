import { useQuery } from "@tanstack/react-query"
import collectionsService, {
  Collection,
} from "../../services/collectionsService"

const useGetCollections = () => {
  return useQuery<Collection[], Error>({
    queryKey: ["collections"],
    queryFn: () => collectionsService.getAll().then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    keepPreviousData: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
}

export default useGetCollections
