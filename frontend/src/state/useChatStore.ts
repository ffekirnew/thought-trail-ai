import { create } from "zustand"

export interface Chat {
  sender: "user" | "bot";
  body: string;
}

interface UseChatStoreType {
  chats: Chat[];
  addChat: (chat: Chat) => void;
}

const useChatStore = create<UseChatStoreType>(set => ({
  chats: [],
  addChat: chat => set(store => {
    store.chats.push(chat);
    return { chats: store.chats };
  }),
}))

export default useChatStore;
