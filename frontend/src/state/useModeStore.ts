import { create } from "zustand";

type UseMode = "global-search" | "second-brain";

interface UseModeStoreType {
  mode: UseMode;
  setMode: (mode: UseMode) => void;
}

const useModeStore = create<UseModeStoreType>((set) => ({
  mode: "global-search",
  setMode: (mode) => set({ mode }),
}));

export default useModeStore;
