import { useState } from "react";
import collectionsService from "../../services/journalsService";

const useDeleteCollection = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);
  
  const deleteCollection = (id: string) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    collectionsService.delete(id).then(() => {
      setSuccess(true);
    }).catch(() => {
      setError("Unable to delete collection. Try again.")
    })
  }

  return { isLoading, error, isSuccess, deleteCollection };
}

export default useDeleteCollection;
