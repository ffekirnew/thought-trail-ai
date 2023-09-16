import { Types } from "mongoose";
import { ICollectionsRepository } from "../../application/contracts/persistence";
import { CollectionEntity, NoteEntity } from "../../domain/entities";
import { UserModel } from "../models";
import { NotesRepository } from ".";

class CollectionRepository implements ICollectionsRepository { 
  constructor(
    private readonly notesRepository: NotesRepository
  ) {}
  private async execute<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCollection(userId: Types.ObjectId, collectionId: Types.ObjectId): Promise<CollectionEntity | null> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const collection = user.collections.find((collection) => collection._id.equals(collectionId));

      if (!collection) {
        throw new Error("Collection not found");
      }
      return this.toCollectionEntity(collection);
    });
  }

  async getCollectionBySlug(userId: Types.ObjectId, collectionSlug: string): Promise<CollectionEntity | null> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const collection = user.collections.find((collection) => collection.slug == collectionSlug);

      if (!collection) {
        throw new Error("Collection not found");
      }
      return this.toCollectionEntity(collection);
    });
  }



  async getAllCollections(userId: Types.ObjectId): Promise<CollectionEntity[]> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      return user.collections.map((collection) => this.toCollectionEntity(collection));
    });
  }

  async createCollection(userId: Types.ObjectId, collection: CollectionEntity): Promise<Types.ObjectId> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const collectionDocument = this.toCollectionDocument(collection);
      user.collections.push(collectionDocument);
      await user.save();

      return collectionDocument._id;
    });
  }

  async deleteCollection(userId: Types.ObjectId, collectionId: Types.ObjectId): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const collectionIndex = user.collections.findIndex((collection) => collection._id.equals(collectionId));
      if (collectionIndex === -1) {
        throw new Error("Collection not found");
      }

      user.collections.splice(collectionIndex, 1);
      await user.save();
    });
  }

  async updateCollection(userId: Types.ObjectId, collectionId: Types.ObjectId, collection: CollectionEntity): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const collectionIndex = user.collections.findIndex((n) => n._id.equals(collectionId));
      if (collectionIndex === -1) {
        throw new Error("Collection not found");
      }

      user.collections[collectionIndex] = this.toCollectionDocument(collection);
      await user.save();
    });
  }

  async addNoteToCollection(userId: Types.ObjectId, collectionId: Types.ObjectId, note: NoteEntity): Promise<Types.ObjectId> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const collection = user.collections.find((collection) => collection._id.equals(collectionId));

      if (!collection) {
        throw new Error("Collection not found");
      }

      collection.notes.push(this.notesRepository.toNoteDocument(note));
      await user.save();
      return null;
    });

  }

  private toCollectionEntity(collectionDocument: any): CollectionEntity {
    const collection = new CollectionEntity({
      _id: collectionDocument._id,
      name: collectionDocument.name,
      description: collectionDocument.description,
      notes: collectionDocument.notes,
      createdAt: collectionDocument.createdAt,
      updatedAt: collectionDocument.updatedAt
    });
    return collection;
  }

  private toCollectionDocument(collection: CollectionEntity): any {
    const collectionDocument: any = {
      name: collection.name,
      description: collection.description,
      slug: collection.slug
    };
    return collectionDocument;
  }
}

export default CollectionRepository;

