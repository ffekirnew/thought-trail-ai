import { create } from "zustand"
import { Collection } from "../services/collectionsService"

type ChatBasis = "journal" | "note"

export interface ChatParameters {
  chatBasis?: ChatBasis
  noteSlug?: string
}

interface UseChatStoreType {
  collections: Collection[]
  setCollections: (collections: Collection[]) => void
}

const useCollectionsStore = create<UseChatStoreType>((set) => ({
  collections: [],
  setCollections: (collections) => set(() => ({ collections })),
}))

export default useCollectionsStore
