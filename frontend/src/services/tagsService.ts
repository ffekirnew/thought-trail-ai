import ApiClient from "./apiClient";

export interface Tag {
  _id: string;
  name: string;
}

export default new ApiClient<Tag>("/tags");
