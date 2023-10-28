import { create } from "zustand";
import { Note } from "../services/notesService";

interface UseNewCollectionNoteStoreType {
  note?: Note;
  setNote: (note: Note) => void;
}

const useNewCollectionNoteStore = create<UseNewCollectionNoteStoreType>(
  (set) => ({
    note: {},
    setNote: (note) => set(() => ({ note })),
  }),
);

export default useNewCollectionNoteStore;
