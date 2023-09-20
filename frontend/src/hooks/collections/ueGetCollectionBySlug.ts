import { useQuery } from "@tanstack/react-query";
import collectionsService, { Collection } from "../../services/collectionsService";

const useGetCollectionBySlug = (slug: string) => {
  return useQuery<Collection, Error>({
    queryKey: ["collections", slug],
    queryFn: () => collectionsService.getBySlug(slug).then(res => res.data),
  });
}

export default useGetCollectionBySlug;
