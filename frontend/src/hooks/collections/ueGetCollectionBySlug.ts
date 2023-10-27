import { useQuery } from "@tanstack/react-query"
import collectionsService, {
  Collection,
} from "../../services/collectionsService"

const useGetCollectionBySlug = (slug: string) => {
  return useQuery<Collection, Error>({
    queryKey: ["collections", slug],
    queryFn: () => collectionsService.getBySlug(slug).then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    keepPreviousData: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
}

export default useGetCollectionBySlug
