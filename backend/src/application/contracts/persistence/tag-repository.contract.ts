import { Types } from "mongoose";
import { TagEntity } from "../../../domain/entities";

abstract class ITagRepository {
  getTag: (
    userId: Types.ObjectId,
    tagId: Types.ObjectId,
  ) => Promise<TagEntity | null>;
  getAllTags: (userId: Types.ObjectId) => Promise<TagEntity[]>;
  createTag: (
    userId: Types.ObjectId,
    note: TagEntity,
  ) => Promise<Types.ObjectId>;
  deleteTag: (userId: Types.ObjectId, tagId: Types.ObjectId) => Promise<void>;
  updateTag: (
    userId: Types.ObjectId,
    tagId: Types.ObjectId,
    note: TagEntity,
  ) => Promise<void>;
}

export default ITagRepository;
