import { collectionsService } from "../../../services";
import { Collection } from "../../../services/collectionsService";
import { Note } from "../../../services/notesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNewCollectionNoteStore from "../../../state/useNewCollectionNoteStore";

interface AddNoteToCollectionData {
  collectionSlug: string;
  note: Note;
}

interface UseAddNoteCollectionContext {
  previousNotes: Note[];
}

const useAddNoteToCollection = () => {
  const setNote = useNewCollectionNoteStore(s => s.setNote);
  const queryClient = useQueryClient();

  const addNoteToCollection = useMutation<void, Error, AddNoteToCollectionData, UseAddNoteCollectionContext>({
    mutationFn: (data) => collectionsService.addNoteToCollection(data.collectionSlug, data.note).then((res) => res.data),
    onMutate: (data) => {
      const previousNotes = queryClient.getQueryData<Note[]>(['collections', data.collectionSlug, 'notes']) || [];

      queryClient.setQueryData<Collection>(
        ['collections', data.collectionSlug],
        (collection) => {
          const coll: Collection = { ...collection, notes: [...(collection?.notes || []), data.note] }
          return coll;
        });

      return { previousNotes };
    },
    onSuccess: (_savedNote, data) => {
      queryClient.invalidateQueries({
        queryKey: ['collections', data.collectionSlug]
      });
      setNote({} as Note);
    },
    onError: (_error, data, context) => {
      queryClient.setQueryData<Note[]>(
        ['collections', data.collectionSlug],
        () => context?.previousNotes);
    }
  });

  return addNoteToCollection;
}

export default useAddNoteToCollection;
