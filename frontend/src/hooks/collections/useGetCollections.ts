import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "../../services/apiClient";
import collectionsService, { Collection } from "../../services/collectionsService";

const useGetCollections = () => {
  return useQuery<FetchResponse<Collection[]>, Error>({
    queryKey: ["collections"],
    queryFn: () => collectionsService.getAll(),
  });
}

export default useGetCollections;
