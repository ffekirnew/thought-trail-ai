import { create } from "zustand"
import { Collection } from "../services/collectionsService"

export type ChatBasis = "Journal" | "Collection"
export interface CollectionType {
  name?: string
  slug?: string
}

export interface ChatParameters {
  chatBasis?: ChatBasis
  collection?: Collection
}

interface UseChatStoreType {
  chatParameters: ChatParameters
  setChatBasis: (chatBasis: ChatBasis) => void
  setCollection: (collection: Collection) => void
}

const useChatParametersStore = create<UseChatStoreType>((set) => ({
  chatParameters: { chatBasis: "Journal" },
  setChatBasis: (chatBasis) => set(() => ({ chatParameters: { chatBasis } })),
  setCollection: (collection) =>
    set((store) => ({
      chatParameters: { ...store.chatParameters, collection },
    })),
}))

export default useChatParametersStore
