import { collectionsService } from "../../../services";
import { Note } from "../../../services/notesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateNoteInCollectionData {
  collection: string;
  noteId: string;
  note: Note;
}

interface UpdateNoteInCollectionContext {
  previousNotes: Note[];
}

const useUpdateNoteInCollection = () => {
  const queryClient = useQueryClient();

  const updateNoteInCollection = useMutation<void, Error, UpdateNoteInCollectionData, UpdateNoteInCollectionContext>({
    mutationFn: (data) => collectionsService.updateNoteInCollection(data.collection, data.noteId, data.note).then((res) => res.data),
    onMutate: (data) => {
      const previousNotes = queryClient.getQueryData<Note[]>(['collections', data.collection, 'notes']) || [];

      queryClient.setQueryData<Note[]>(
        ['collections', data.collection, 'notes'],
        (notes) => notes?.map(note => note._id === data.noteId ? data.note : note))
      queryClient.invalidateQueries(['collections', data.collection, 'notes', data.noteId]);

      return { previousNotes };
    },
    onError: (_error, data, context) => {
      queryClient.setQueryData<Note[]>(
        ['collections', data.collection, 'notes'],
        () => context?.previousNotes);
    }
  });

  return updateNoteInCollection;
}

export default useUpdateNoteInCollection;
