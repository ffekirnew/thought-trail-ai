import { useState } from "react";
import collectionsService, { Collection } from "../../services/collectionsService";

const useUpdateCollection = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);
  
  const updateCollection = (id: string, data: Collection) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    collectionsService.update(id, data).then(() => {
      setSuccess(true);
    }).catch(() => {
      setError("Unable to update collection. Try again.")
    }).finally(() => {
      setLoading(false);
    });
  }

  return { isLoading, error, isSuccess, updateCollection };
}

export default useUpdateCollection;
