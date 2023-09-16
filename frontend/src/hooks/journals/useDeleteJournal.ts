import { useState } from "react";
import journalsService from "../../services/journalsService";

const useDeleteJournal = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);
  
  const deleteJournal = (id: string) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    journalsService.delete(id).then(() => {
      setSuccess(true);
    }).catch(() => {
      setError("Unable to delete journal. Try again.")
    })
  }

  return { isLoading, error, isSuccess, deleteJournal };
}

export default useDeleteJournal;
