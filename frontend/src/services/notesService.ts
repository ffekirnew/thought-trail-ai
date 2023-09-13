import ApiClient from "./apiClient";
import { Tag } from "./tagsService";

export interface Note {
  _id: string;
  title: string;
  body: string;
  tags: Tag[];
}

export default new ApiClient<Note>("/notes")
