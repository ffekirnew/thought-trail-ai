import { useState } from "react";
import { collectionsService } from "../../../services";

const deleteNoteFromCollection = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);
  
  const deleteNoteFromCollection = (collectionSlug: string, noteId: string) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    collectionsService.deleteNoteFromCollection(collectionSlug, noteId).then(() => {
      setSuccess(true);
    }).catch(() => {
      setError("Unable to delete note from collection. Try again.")
    }).finally(() => {
      setLoading(false);
    });
  }

  return { isLoading, error, isSuccess, deleteNoteFromCollection };
}

export default deleteNoteFromCollection;
