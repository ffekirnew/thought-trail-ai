import journalsService, { Journal } from "../../services/journalsService"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface DeleteJournalContext {
  previousJournals: Journal[]
}

const useDeleteJournal = () => {
  const queryClient = useQueryClient()

  const deleteJournal = useMutation<void, Error, string, DeleteJournalContext>({
    mutationFn: (id) => journalsService.delete(id).then((res) => res.data),
    onMutate: (id) => {
      const previousJournals =
        queryClient.getQueryData<Journal[]>(["journals"]) || []

      queryClient.setQueryData<Journal[]>(
        ["journals"],
        (journals) => journals?.filter((journal) => journal._id !== id),
      )
      queryClient.invalidateQueries(["journals", id])

      return { previousJournals }
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(["journals"], () => context?.previousJournals)
    },
  })

  return deleteJournal
}

export default useDeleteJournal
