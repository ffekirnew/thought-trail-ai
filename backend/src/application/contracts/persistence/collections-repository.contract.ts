import { Types } from "mongoose";
import CollectionEntity from "../../../domain/entities/collection.entity";
import { NoteEntity } from "../../../domain/entities";

abstract class ICollectionsRepository {
  getCollection: (
    userId: Types.ObjectId,
    collectionId: Types.ObjectId,
  ) => Promise<CollectionEntity | null>;
  getCollectionBySlug: (
    userId: Types.ObjectId,
    collectionSlug: string,
  ) => Promise<CollectionEntity | null>;
  getAllCollections: (userId: Types.ObjectId) => Promise<CollectionEntity[]>;
  createCollection: (
    userId: Types.ObjectId,
    collection: CollectionEntity,
  ) => Promise<Types.ObjectId | null>;
  deleteCollection: (
    userId: Types.ObjectId,
    collectionId: Types.ObjectId,
  ) => Promise<void>;
  updateCollection: (
    userId: Types.ObjectId,
    collectionId: Types.ObjectId,
    collection: CollectionEntity,
  ) => Promise<void>;
  getCollectionNotes: (
    userId: Types.ObjectId,
    collectionSlug: string,
  ) => Promise<NoteEntity[]>;
  getCollectionNote: (
    userId: Types.ObjectId,
    collectionSlug: string,
    noteId: Types.ObjectId,
  ) => Promise<NoteEntity | null>;
  addNoteToCollection: (
    userId: Types.ObjectId,
    collectionSlug: string,
    note: NoteEntity,
  ) => Promise<Types.ObjectId | null>;
  removeNoteFromCollection: (
    userId: Types.ObjectId,
    collectionSlug: string,
    noteId: Types.ObjectId,
  ) => Promise<void>;
  updateNoteInCollection: (
    userId: Types.ObjectId,
    collectionSlug: string,
    noteId: Types.ObjectId,
    note: NoteEntity,
  ) => Promise<void>;
}

export default ICollectionsRepository;
