import { useState } from "react";
import { collectionsService } from "../../services";
import { Collection } from "../../services/collectionsService";

const useCreateCollection = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);
  
  const createCollection = (data: Collection) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    collectionsService.create(data).then(() => {
      setSuccess(true);
    }).catch(() => {
      setError("Unable to create collection. Try again.")
    }).finally(() => {
      setLoading(false);
    })
  }

  return { isLoading, error, isSuccess, createCollection };
}

export default useCreateCollection;
