import { journalsService } from "../../services"
import { Journal } from "../../services/journalsService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useNewJournalStore from "../../state/useNewJournalStore"

interface UseCreateJournalContext {
  previousJournals: Journal[]
}

const useCreateJournal = () => {
  const queryClient = useQueryClient()
  const setJournal = useNewJournalStore((s) => s.setJournal)

  const createJournal = useMutation<
    void,
    Error,
    Journal,
    UseCreateJournalContext
  >({
    mutationFn: (journal: Journal) =>
      journalsService.create(journal).then((res) => res.data),
    onMutate: (journal) => {
      const previousJournals =
        queryClient.getQueryData<Journal[]>(["journals"]) || []
      queryClient.setQueryData<Journal[]>(["journals"], (journals) => [
        ...(journals || []),
        journal,
      ])

      return { previousJournals }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["journals"],
      })
      setJournal({} as Journal)
    },
    onError: (_error, _journal, context) => {
      queryClient.setQueryData<Journal[]>(
        ["journals"],
        () => context?.previousJournals,
      )
    },
  })

  return createJournal
}

export default useCreateJournal
