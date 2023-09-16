import { useState } from "react";
import journalsService, { Journal } from "../../services/journalsService";

const useUpdateJournal = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);
  
  const updateJournal = (id: string, data: Journal) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    journalsService.update(id, data).then(() => {
      setSuccess(true);
    }).catch(() => {
      setError("Unable to update journal. Try again.")
    }).finally(() => {
      setLoading(false);
    });
  }

  return { isLoading, error, isSuccess, updateJournal };
}

export default useUpdateJournal;
