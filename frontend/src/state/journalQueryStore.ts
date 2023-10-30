import { create } from "zustand";

export interface JournalQuery {
  ordering: string;
  orderBy: string;
}

interface JournalQueryStore {
  journalQuery: JournalQuery;
  setOrdering: (ordering: string) => void;
  setOrderBy: (orderBy: string) => void;
}

const useJournalQueryStore = create<JournalQueryStore>((set) => ({
  journalQuery: { ordering: "asc", orderBy: "createdAt" },
  setOrdering: (ordering) =>
    set((store) => ({ journalQuery: { ...store.journalQuery, ordering } })),
  setOrderBy: (orderBy) =>
    set((store) => ({ journalQuery: { ...store.journalQuery, orderBy } })),
}));

export default useJournalQueryStore;
