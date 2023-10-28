import { collectionsService } from "../../../services";
import { Collection } from "../../../services/collectionsService";
import { Note } from "../../../services/notesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateNoteInCollectionData {
  collectionSlug: string;
  noteId: string;
  note: Note;
}

interface UpdateNoteInCollectionContext {
  previousNotes: Note[];
}

const useUpdateNoteInCollection = () => {
  const queryClient = useQueryClient();

  const updateNoteInCollection = useMutation<
    void,
    Error,
    UpdateNoteInCollectionData,
    UpdateNoteInCollectionContext
  >({
    mutationFn: (data) =>
      collectionsService
        .updateNoteInCollection(data.collectionSlug, data.noteId, data.note)
        .then((res) => res.data),
    onMutate: (data) => {
      const previousNotes =
        queryClient.getQueryData<Note[]>([
          "collections",
          data.collectionSlug,
          "notes",
        ]) || [];

      queryClient.setQueryData<Collection>(
        ["collections", data.collectionSlug],
        (collection) => {
          return {
            ...collection,
            notes: collection?.notes?.map((note) =>
              note._id == data.noteId ? data.note : note,
            ),
          };
        },
      );
      queryClient.invalidateQueries([
        "collections",
        data.collectionSlug,
        "notes",
        data.noteId,
      ]);

      return { previousNotes };
    },
    onError: (_error, data, context) => {
      queryClient.setQueryData<Note[]>(
        ["collections", data.collectionSlug, "notes"],
        () => context?.previousNotes,
      );
    },
  });

  return updateNoteInCollection;
};

export default useUpdateNoteInCollection;
