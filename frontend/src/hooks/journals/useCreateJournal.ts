import { useState } from "react";
import { journalsService } from "../../services";
import { Journal } from "../../services/journalsService";

const useCreateJournal = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);
  
  const createJournal = (data: Journal) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    journalsService.create(data).then(() => {
      setSuccess(true);
    }).catch(() => {
      setError("Unable to create journal. Try again.")
    }).finally(() => {
      setLoading(false);
    })
  }

  return { isLoading, error, isSuccess, createJournal };
}

export default useCreateJournal;
