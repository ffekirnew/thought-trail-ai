import { collectionsService } from "../../services";
import { Collection } from "../../services/collectionsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateCollection = () => {
  const queryClient = useQueryClient();

  const createCollection = useMutation<void, Error, Collection>({
    mutationFn: (collection: Collection) => collectionsService.create(collection).then((res) => res.data),
    onMutate: (collection) => {
      console.log(queryClient.getQueryData<Collection[]>(['collections']));
      queryClient.setQueryData<Collection[]>(['collections'], collections => [...(collections || []), collection]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['collections']
      });
    }
  });

  return createCollection;
}

export default useCreateCollection;
