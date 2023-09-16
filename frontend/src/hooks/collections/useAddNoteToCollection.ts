import { useState } from "react";
import { collectionsService } from "../../services";
import { Note } from "../../services/notesService";

const useAddNoteToCollection = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);
  
  const createCollection = (collectionId: string, note: Note) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    collectionsService.addNoteToCollection(collectionId, note).then(() => {
      setSuccess(true);
    }).catch(() => {
      setError("Unable to add note to collection. Try again.")
    }).finally(() => {
      setLoading(false);
    })
  }

  return { isLoading, error, isSuccess, createCollection };
}

export default useAddNoteToCollection;
