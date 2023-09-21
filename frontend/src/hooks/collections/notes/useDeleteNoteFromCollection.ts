import { collectionsService } from "../../../services";
import { Collection } from "../../../services/collectionsService";
import { Note } from "../../../services/notesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteNoteInCollectionData {
  collectionSlug: string;
  noteId: string;
}

interface DeleteNoteInCollectionContext {
  previousNotes: Note[];
}

const useDeleteNoteFromCollection = () => {
  const queryClient = useQueryClient();

  const deleteNoteFromCollection = useMutation<void, Error, DeleteNoteInCollectionData, DeleteNoteInCollectionContext>({
    mutationFn: (data) => collectionsService.deleteNoteFromCollection(data.collectionSlug, data.noteId).then((res) => res.data),
    onMutate: (data) => {
      const previousNotes = queryClient.getQueryData<Note[]>(['collections', data.collectionSlug, 'notes']) || [];

      queryClient.setQueryData<Collection>(
        ['collections', data.collectionSlug],
        (collection) => {
          return { ...collection, notes: collection?.notes?.filter(note => note._id !== data.noteId) }
        });
      queryClient.invalidateQueries(['collections', data.collectionSlug, 'notes', data.noteId]);

      return { previousNotes };
    },
    onError: (_, data, context) => {
      queryClient.setQueryData<Note[]>(
        ['collections', data.collectionSlug, 'notes'],
        () => context?.previousNotes);
    }
  });

  return deleteNoteFromCollection;
}

export default useDeleteNoteFromCollection;
