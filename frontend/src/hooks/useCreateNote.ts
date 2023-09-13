import { useState } from "react";
import notesService, { Note } from "../services/notesService";

const useCreateNote = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);
  
  const createNote = (data: Note) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    notesService.create(data).then(() => {
      setSuccess(true);
    }).catch(() => {
      setError("Unable to create note. Try again.")
    }).finally(() => {
      setLoading(false);
    })
  }

  return { isLoading, error, isSuccess, createNote };
}

export default useCreateNote;
