import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "../../services/apiClient";
import collectionsService, { Collection } from "../../services/collectionsService";

const useGetCollection = (id: string) => {
  return useQuery<FetchResponse<Collection>, Error>({
    queryKey: ["collections", id],
    queryFn: () => collectionsService.get(id),
  });
}

export default useGetCollection;
