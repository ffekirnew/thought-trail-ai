import { create } from "zustand"
import { User } from "../services/authClient"

interface UseAuthStoreType {
  user: User
  token: string
  setUser: (user: User) => void
  setToken: (token: string) => void
}

const useAuthStore = create<UseAuthStoreType>((set) => ({
  user: {} as User,
  token: "",
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}))

export default useAuthStore
