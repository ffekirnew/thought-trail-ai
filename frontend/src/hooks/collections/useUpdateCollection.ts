import collectionsService, {
  Collection,
} from "../../services/collectionsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateCollectionData {
  id: string;
  collection: Collection;
}

interface UpdateCollectionContext {
  previousCollections: Collection[];
}

const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  const updateCollection = useMutation<
    void,
    Error,
    UpdateCollectionData,
    UpdateCollectionContext
  >({
    mutationFn: (updateCollectionData) =>
      collectionsService
        .update(updateCollectionData.id, updateCollectionData.collection)
        .then((res) => res.data),
    onMutate: (updateCollectionData) => {
      const previousCollections =
        queryClient.getQueryData<Collection[]>(["collections"]) || [];

      queryClient.setQueryData<Collection[]>(["collections"], (collections) => {
        return collections?.map((collection) =>
          collection._id === updateCollectionData.id
            ? updateCollectionData.collection
            : collection,
        );
      });
      queryClient.invalidateQueries(["collections", updateCollectionData.id]);

      return { previousCollections };
    },
    onError: (_error, _updateCollectionData, context) => {
      queryClient.setQueryData<Collection[]>(
        ["collections"],
        () => context?.previousCollections,
      );
    },
  });

  return updateCollection;
};

export default useUpdateCollection;
