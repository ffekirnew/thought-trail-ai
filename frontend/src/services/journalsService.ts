import ApiClient from "./apiClient"

export interface Journal {
  _id?: string
  title?: string
  body?: string
  createdAt?: Date
  updatedAt?: Date
}

export default new ApiClient<Journal>("/journals")
