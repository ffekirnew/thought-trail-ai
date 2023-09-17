import { useState } from "react";
import { collectionsService } from "../../../services";
import { Note } from "../../../services/notesService";

const updateNoteInCollection = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);
  
  const updateNoteInCollection = (collectionSlug: string, noteId: string, note: Note) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    collectionsService.updateNoteInCollection(collectionSlug, noteId, note).then(() => {
      setSuccess(true);
    }).catch(() => {
      setError("Unable to delete note from collection. Try again.")
    }).finally(() => {
      setLoading(false);
    })
  }

  return { isLoading, error, isSuccess, updateNoteInCollection };
}

export default updateNoteInCollection;
