import { collectionsService } from "../../../services";
import { Note } from "../../../services/notesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddNoteToCollectionData {
  collection: string;
  note: Note;
}
const useAddNoteToCollection = () => {
  const queryClient = useQueryClient();

  const addNoteToCollection = useMutation<void, Error, AddNoteToCollectionData>({
    mutationFn: (data) => collectionsService.addNoteToCollection(data.collection, data.note).then((res) => res.data),
    onSuccess: (_savedNote, data) => {
      queryClient.invalidateQueries({
        queryKey: ['collections', data.collection]
      });
    }
  });

  return addNoteToCollection;
}

export default useAddNoteToCollection;
