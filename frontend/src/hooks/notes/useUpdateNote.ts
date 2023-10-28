import { useState } from "react";
import notesService, { Note } from "../../services/notesService";

const useUpdateNote = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const updateNote = (id: string, data: Note) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    notesService
      .update(id, data)
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        setError("Unable to update note. Try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { isLoading, error, isSuccess, updateNote };
};

export default useUpdateNote;
