import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "../../services/apiClient";
import collectionsService, { Collection } from "../../services/collectionsService";

const useGetCollectionBySlug = (slug: string) => {
  return useQuery<FetchResponse<Collection>, Error>({
    queryKey: ["collections", slug],
    queryFn: () => collectionsService.getBySlug(slug),
  });
}

export default useGetCollectionBySlug;
