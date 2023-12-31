import { Types } from "mongoose";
import { ICollectionsRepository } from "../../application/contracts/persistence";
import { CollectionEntity, NoteEntity } from "../../domain/entities";
import { UserModel } from "../models";
import { CollectionsRepository, NotesRepository } from ".";

class CollectionRepository implements ICollectionsRepository {
  constructor(private readonly notesRepository: NotesRepository) {}

  private async execute<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCollection(
    userId: Types.ObjectId,
    collectionId: Types.ObjectId,
  ): Promise<CollectionEntity | null> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const collection = user.collections.find((collection) =>
        collection._id.equals(collectionId),
      );

      if (!collection) {
        throw new Error("Collection not found");
      }
      return CollectionRepository.toCollectionEntity(collection);
    });
  }

  async getCollectionBySlug(
    userId: Types.ObjectId,
    collectionSlug: string,
  ): Promise<CollectionEntity | null> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const collection = user.collections.find(
        (collection) => collection.slug == collectionSlug,
      );

      if (!collection) {
        throw new Error("Collection not found");
      }
      return CollectionRepository.toCollectionEntity(collection);
    });
  }

  async getAllCollections(userId: Types.ObjectId): Promise<CollectionEntity[]> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      return user.collections.map((collection) =>
        CollectionsRepository.toCollectionEntity(collection),
      );
    });
  }

  async createCollection(
    userId: Types.ObjectId,
    collection: CollectionEntity,
  ): Promise<Types.ObjectId> {
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

  async deleteCollection(
    userId: Types.ObjectId,
    collectionId: Types.ObjectId,
  ): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const collectionIndex = user.collections.findIndex((collection) =>
        collection._id.equals(collectionId),
      );
      if (collectionIndex === -1) {
        throw new Error("Collection not found");
      }

      user.collections.splice(collectionIndex, 1);
      await user.save();
    });
  }

  async updateCollection(
    userId: Types.ObjectId,
    collectionId: Types.ObjectId,
    collection: CollectionEntity,
  ): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const collectionIndex = user.collections.findIndex((n) =>
        n._id.equals(collectionId),
      );
      if (collectionIndex === -1) {
        throw new Error("Collection not found");
      }

      user.collections[collectionIndex] = this.toCollectionDocument(collection);
      await user.save();
    });
  }

  async addNoteToCollection(
    userId: Types.ObjectId,
    collectionSlug: string,
    note: NoteEntity,
  ): Promise<Types.ObjectId> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const collection = user.collections.find(
        (collection) => collection.slug === collectionSlug,
      );

      if (!collection) {
        throw new Error("Collection not found");
      }

      collection.notes.push(this.notesRepository.toNoteDocument(note));
      await user.save();
      return null;
    });
  }

  async getCollectionNote(
    userId: Types.ObjectId,
    collectionSlug: string,
    noteId: Types.ObjectId,
  ): Promise<NoteEntity | null> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const collection = user.collections.find(
        (collection) => collection.slug == collectionSlug,
      );

      if (!collection) {
        throw new Error("Collection not found");
      }

      const note = collection.notes.find((note) => note._id.equals(noteId));

      if (!note) {
        throw new Error("Note not found");
      }
      return this.notesRepository.toNoteEntity(note);
    });
  }

  async getCollectionNotes(
    userId: Types.ObjectId,
    collectionSlug: string,
  ): Promise<NoteEntity[]> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const collection = user.collections.find(
        (collection) => collection.slug == collectionSlug,
      );

      if (!collection) {
        throw new Error("Collection not found");
      }

      return collection.notes.map((note) =>
        this.notesRepository.toNoteEntity(note),
      );
    });
  }
  async removeNoteFromCollection(
    userId: Types.ObjectId,
    collectionSlug: string,
    noteId: Types.ObjectId,
  ): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const collection = user.collections.find(
        (collection) => collection.slug == collectionSlug,
      );

      if (!collection) {
        throw new Error("Collection not found");
      }

      const noteIndex = collection.notes.findIndex((note) =>
        note._id.equals(noteId),
      );

      if (noteIndex === -1) {
        throw new Error("Note not found");
      }

      collection.notes.splice(noteIndex, 1);
      await user.save();
    });
  }

  async updateNoteInCollection(
    userId: Types.ObjectId,
    collectionSlug: string,
    noteId: Types.ObjectId,
    note: NoteEntity,
  ): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const collection = user.collections.find(
        (collection) => collection.slug == collectionSlug,
      );

      if (!collection) {
        throw new Error("Collection not found");
      }

      const noteIndex = collection.notes.findIndex((note) =>
        note._id.equals(noteId),
      );

      if (noteIndex === -1) {
        throw new Error("Note not found");
      }

      collection.notes[noteIndex] = this.notesRepository.toNoteDocument(note);
      await user.save();
    });
  }

  static toCollectionEntity(collectionDocument: any): CollectionEntity {
    const collection = new CollectionEntity({
      _id: collectionDocument._id,
      name: collectionDocument.name,
      description: collectionDocument.description,
      slug: collectionDocument.slug,
      notes: collectionDocument.notes,
      createdAt: collectionDocument.createdAt,
      updatedAt: collectionDocument.updatedAt,
    });
    return collection;
  }

  private toCollectionDocument(collection: CollectionEntity): any {
    const collectionDocument: any = {
      name: collection.name,
      description: collection.description,
      slug: collection.slug,
    };
    return collectionDocument;
  }
}

export default CollectionRepository;
