import { create } from "zustand"
import { Journal } from "../services/journalsService"

interface UseNewJournalStoreType {
  journal?: Journal
  setJournal: (journal?: Journal) => void
}

const useNewJournalStore = create<UseNewJournalStoreType>((set) => ({
  journal: {},
  setJournal: (journal) => set(() => ({ journal })),
}))

export default useNewJournalStore
