import ApiClient from "./apiClient";
import { Tag } from "./tagsService";

export interface Note {
  _id?: string;
  title?: string;
  body?: string;
  tags?: Tag[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default new ApiClient<Note>("/notes");
