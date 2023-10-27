import ApiClient, { FetchResponse } from "./apiClient"
import { Note } from "./notesService"

export interface Collection {
  _id?: string
  slug?: string
  name?: string
  description?: string
  notes?: Note[]
  createdAt?: Date
  updatedAt?: Date
}

class CollectionClient extends ApiClient<Collection> {
  constructor() {
    super("/collections")
  }

  getBySlug = async (slug: string) => {
    return this.axiosInstance
      .get<FetchResponse<Collection>>(`${this.endpoint}/slug/${slug}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
  }

  getNote = async (slug: string, noteId: string) => {
    return this.axiosInstance
      .get<FetchResponse<Note>>(
        `${this.endpoint}/slug/${slug}/notes/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => res.data)
  }

  getNotes = async (slug: string) => {
    return this.axiosInstance
      .get<FetchResponse<Note[]>>(`${this.endpoint}/slug/${slug}/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
  }

  addNoteToCollection = async (collectionSlug: string, note: Note) => {
    return this.axiosInstance
      .post<FetchResponse<void>>(
        `${this.endpoint}/slug/${collectionSlug}/notes`,
        { note: note },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => res.data)
  }

  updateNoteInCollection = async (
    collectionSlug: string,
    noteId: string,
    note: Note,
  ) => {
    return this.axiosInstance
      .put<FetchResponse<void>>(
        `${this.endpoint}/slug/${collectionSlug}/notes/${noteId}`,
        { note: note },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => res.data)
  }

  deleteNoteFromCollection = async (collectionSlug: string, noteId: string) => {
    return this.axiosInstance
      .put<FetchResponse<void>>(
        `${this.endpoint}/slug/${collectionSlug}/notes/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => res.data)
  }
}

export default new CollectionClient()
