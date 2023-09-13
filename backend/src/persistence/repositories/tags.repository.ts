
import { Types } from "mongoose";
import { ITagRepository } from "../../application/contracts/persistence";
import { TagEntity } from "../../domain/entities";
import { UserModel } from "../models";

class TagsRepository implements ITagRepository {
  private async execute<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTag(userId: Types.ObjectId, tagId: Types.ObjectId): Promise<TagEntity> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const tag = user.tags.find((t) => t._id.equals(tagId));
      if (!tag) {
        throw new Error("Tag not found");
      }

      return this.toTagEntity(tag);
    });
  }

  async getAllTags(userId: Types.ObjectId): Promise<TagEntity[]> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        return [];
      }

      return user.tags.map((tag) => this.toTagEntity(tag));
    });
  }

  async createTag(userId: Types.ObjectId, tag: TagEntity): Promise<Types.ObjectId> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const tagDocument = this.toTagDocument(tag);
      user.tags.push(tagDocument);
      await user.save();

      return tagDocument._id;
    });
  }

  async deleteTag(userId: Types.ObjectId, tagId: Types.ObjectId): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const tagIndex = user.tags.findIndex((tag) => tag._id.equals(tagId));
      if (tagIndex === -1) {
        throw new Error("Tag not found");
      }

      user.tags.splice(tagIndex, 1);
      await user.save();
    });
  }

  async updateTag(userId: Types.ObjectId, tagId: Types.ObjectId, tag: TagEntity): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const tagIndex = user.tags.findIndex((t) => t._id.equals(tagId));
      if (tagIndex === -1) {
        throw new Error("Tag not found");
      }

      user.tags[tagIndex] = this.toTagDocument(tag);
      await user.save();
    });
  }

  private toTagEntity(tagDocument: any): TagEntity {
    const tag = new TagEntity({
      _id: tagDocument._id,
      name: tagDocument.name,
      createdAt: tagDocument.createdAt,
      updatedAt: tagDocument.updatedAt,
    });

    return tag;
  }

  private toTagDocument(tag: TagEntity): any {
    return {
      _id: tag._id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    };
  }
}

export default TagsRepository;

