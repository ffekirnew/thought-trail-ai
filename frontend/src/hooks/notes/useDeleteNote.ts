import { useState } from "react"
import notesService from "../../services/notesService"

const useDeleteNote = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [isSuccess, setSuccess] = useState<boolean>(false)

  const deleteNote = (id: string) => {
    setLoading(true)
    setError("")
    setSuccess(false)

    notesService
      .delete(id)
      .then(() => {
        setSuccess(true)
      })
      .catch(() => {
        setError("Unable to delete note. Try again.")
      })
  }

  return { isLoading, error, isSuccess, deleteNote }
}

export default useDeleteNote
