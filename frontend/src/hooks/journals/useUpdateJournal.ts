import journalsService, { Journal } from "../../services/journalsService"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface UpdateJournalInterface {
  id: string
  journal: Journal
}

interface UpdateJournalContext {
  previousJournals: Journal[]
}

const useUpdateJournal = () => {
  const queryClient = useQueryClient()

  const updateJournal = useMutation<
    Journal,
    Error,
    UpdateJournalInterface,
    UpdateJournalContext
  >({
    mutationFn: (updateJournal) =>
      journalsService
        .update(updateJournal.id, updateJournal.journal)
        .then((res) => res.data),
    onMutate: (data) => {
      const previousJournals =
        queryClient.getQueryData<Journal[]>(["journals"]) || []

      queryClient.setQueryData<Journal[]>(
        ["journals"],
        (journals) =>
          journals?.map((journal) =>
            journal._id === data.id ? data.journal : journal,
          ),
      )
      queryClient.invalidateQueries(["journals", data.id])

      return { previousJournals }
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(["journals"], () => context?.previousJournals)
    },
  })

  return updateJournal
}

export default useUpdateJournal
