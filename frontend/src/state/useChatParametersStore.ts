import { create } from "zustand"

export type ChatBasis = "Journal" | "Collection";
export interface CollectionType {
  name?: string;
  slug?: string;
}

export interface ChatParameters {
  chatBasis?: ChatBasis;
  collectionName?: string;
}

interface UseChatStoreType {
  chatParameters: ChatParameters;
  setChatBasis: (chatBasis: ChatBasis) => void;
  setCollectionName: (noteSlug: string) => void;
}

const useChatParametersStore = create<UseChatStoreType>(set => ({
  chatParameters: { chatBasis: "Journal" },
  setChatBasis: chatBasis => set(() => ({chatParameters: { chatBasis }})),
  setCollectionName: noteSlug => set(store => ({ chatParameters: { ...store.chatParameters, collectionName: noteSlug }}))
  })
);

export default useChatParametersStore;
