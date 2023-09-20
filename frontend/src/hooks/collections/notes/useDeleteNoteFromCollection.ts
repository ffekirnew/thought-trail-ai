import { collectionsService } from "../../../services";
import { Note } from "../../../services/notesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteNoteInCollectionData {
  collection: string;
  noteId: string;
}

interface DeleteNoteInCollectionContext {
  previousNotes: Note[];
}

const useDeleteNoteFromCollection = () => {
  const queryClient = useQueryClient();

  const deleteNoteFromCollection = useMutation<void, Error, DeleteNoteInCollectionData, DeleteNoteInCollectionContext>({
    mutationFn: (data) => collectionsService.deleteNoteFromCollection(data.collection, data.noteId).then((res) => res.data),
    onMutate: (data) => {
      const previousNotes = queryClient.getQueryData<Note[]>(['collections', data.collection, 'notes']) || [];

      queryClient.setQueryData<Note[]>(
        ['collections', data.collection, 'notes'],
        notes => notes?.filter(note => note._id !== data.noteId))
      queryClient.invalidateQueries(['collections', data.collection, 'notes', data.noteId]);

      return { previousNotes };
    },
    onError: (_, data, context) => {
      queryClient.setQueryData<Note[]>(
        ['collections', data.collection, 'notes'],
        () => context?.previousNotes);
    }
  });

  return deleteNoteFromCollection;
}

export default useDeleteNoteFromCollection;
