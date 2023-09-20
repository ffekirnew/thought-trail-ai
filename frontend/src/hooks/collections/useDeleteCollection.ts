import collectionsService, { Collection } from "../../services/collectionsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteCollectionContext {
  previousCollections: Collection[];
}
const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  const deleteCollection = useMutation<void, Error, string, DeleteCollectionContext>({
    mutationFn: (id) => collectionsService.delete(id).then((res) => res.data),
    onMutate: (id) => {
      const previousCollections = queryClient.getQueryData<Collection[]>(['collections']) || [];

      queryClient.setQueryData<Collection[]>(['collections'], (collections) => {
        return collections?.filter(collection => collection._id !== id);
      });
      queryClient.invalidateQueries(['collections', id]);

      return { previousCollections };
    },
    onError: (_error, _updateCollectionData, context) => {
      queryClient.setQueryData<Collection[]>(['collections'], () => context?.previousCollections);
    }
  });

  return deleteCollection;
}

export default useDeleteCollection;
