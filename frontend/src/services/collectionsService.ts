import ApiClient, { FetchResponse } from "./apiClient";
import { Note } from "./notesService";

export interface Collection {
  _id: string;
  name: string;
  description: string;
  notes: Note[];
  createdAt?: Date;
  updatedAt?: Date;
}

class CollectionClient extends ApiClient<Collection> {
  constructor() {
    super("/collections");
  }

  addNoteToCollection = async (collectionId: string, note: Note) => {
    return this.axiosInstance.post<FetchResponse<void>>(`${this.endpoint}/${collectionId}/add-note`, note, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => res.data);
  }
}

export default new CollectionClient();
