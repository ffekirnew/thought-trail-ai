import { Types } from "mongoose";

import {
  CreateCollectionDto,
  UpdateCollectionDto,
  DeleteCollectionDto,
  GetAllCollectionsDto,
  GetCollectionDto,
  GetCollectionBySlugDto,
  CollectionDto,
} from "./dtos";
import {
  CollectionEntity,
  NoteEntity,
  TagEntity,
} from "../../../domain/entities";
import { ISlugify } from "../../contracts/infrastructure";
import { ICollectionsRepository } from "../../contracts/persistence";
import { BaseResponse } from "../../responses";
import { NoteDto } from "../notes/dtos";
import {
  AddNoteDto,
  GetNote,
  DeleteNoteDto,
  UpdateNoteDto,
} from "./dtos/collection-note";
import GetNotesDto from "./dtos/collection-note/get-notes.dto";

class CollectionsApplication {
  constructor(
    private readonly collectionsRepository: ICollectionsRepository,
    private readonly slugify: ISlugify,
  ) {}

  create = async (
    createCollectionDto: CreateCollectionDto,
  ): Promise<BaseResponse<Types.ObjectId>> => {
    try {
      createCollectionDto.validate();
      const newCollection = new CollectionEntity({
        name: createCollectionDto.name,
        description: createCollectionDto.description,
        slug: this.slugify.CreateSlug(createCollectionDto.name),
      });

      const id = await this.collectionsRepository.createCollection(
        new Types.ObjectId(createCollectionDto.userId),
        newCollection,
      );
      return BaseResponse.success<Types.ObjectId>(
        "Collection created successfully.",
        id,
      );
    } catch (error) {
      return BaseResponse.error<Types.ObjectId>(
        "Collection creation failed.",
        error.message,
      );
    }
  };

  update = async (
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<BaseResponse<void>> => {
    try {
      updateCollectionDto.validate();
      const newCollection = new CollectionEntity({
        name: updateCollectionDto.name,
        description: updateCollectionDto.description,
      });

      await this.collectionsRepository.updateCollection(
        new Types.ObjectId(updateCollectionDto.userId),
        new Types.ObjectId(updateCollectionDto.collectionId),
        newCollection,
      );
      return BaseResponse.success<void>(
        "Collection updation successfully.",
        null,
      );
    } catch (error) {
      return BaseResponse.error<void>(
        "Collection updation failed.",
        error.message,
      );
    }
  };

  delete = async (
    deleteCollectionDto: DeleteCollectionDto,
  ): Promise<BaseResponse<void>> => {
    try {
      deleteCollectionDto.validate();
      await this.collectionsRepository.deleteCollection(
        new Types.ObjectId(deleteCollectionDto.userId),
        new Types.ObjectId(deleteCollectionDto.collectionId),
      );
      return BaseResponse.success<void>(
        "Collection deleted successfully.",
        null,
      );
    } catch (error) {
      return BaseResponse.error<void>(
        "Collection deletion failed.",
        error.message,
      );
    }
  };

  getAll = async (
    getAllCollectionsDto: GetAllCollectionsDto,
  ): Promise<BaseResponse<CollectionDto[]>> => {
    try {
      getAllCollectionsDto.validate();
      const collections = await this.collectionsRepository.getAllCollections(
        new Types.ObjectId(getAllCollectionsDto.userId),
      );

      return BaseResponse.success<CollectionDto[]>(
        "Collections retrieved successfully.",
        collections.map((collection) => CollectionDto.fromEntity(collection)),
      );
    } catch (error) {
      return BaseResponse.error<CollectionDto[]>(
        "Collections could not be retrieved.",
        error.message,
      );
    }
  };

  getBySlug = async (
    getCollectionBySlugDto: GetCollectionBySlugDto,
  ): Promise<BaseResponse<CollectionDto>> => {
    try {
      getCollectionBySlugDto.validate();
      const collection = await this.collectionsRepository.getCollectionBySlug(
        new Types.ObjectId(getCollectionBySlugDto.userId),
        getCollectionBySlugDto.collectionSlug,
      );
      return BaseResponse.success<CollectionDto>(
        "Collection retrieved successfully.",
        CollectionDto.fromEntity(collection),
      );
    } catch (error) {
      return BaseResponse.error<CollectionDto>(
        "Collection could not be retrieved.",
        error.message,
      );
    }
  };

  get = async (
    getCollectionDto: GetCollectionDto,
  ): Promise<BaseResponse<CollectionDto>> => {
    try {
      getCollectionDto.validate();
      const collection = await this.collectionsRepository.getCollection(
        new Types.ObjectId(getCollectionDto.userId),
        new Types.ObjectId(getCollectionDto.collectionId),
      );
      return BaseResponse.success<CollectionDto>(
        "Collection retrieved successfully.",
        CollectionDto.fromEntity(collection),
      );
    } catch (error) {
      return BaseResponse.error<CollectionDto>(
        "Collection could not be retrieved.",
        error.message,
      );
    }
  };

  addNoteToCollection = async (
    addNoteToCollectionDto: AddNoteDto,
  ): Promise<BaseResponse<string>> => {
    try {
      addNoteToCollectionDto.validate();
      const newNote = new NoteEntity({
        title: addNoteToCollectionDto.note.title,
        body: addNoteToCollectionDto.note.body,
        tags: addNoteToCollectionDto.note.tags.map(
          (tag) => new TagEntity({ name: tag.name }),
        ),
      });
      await this.collectionsRepository.addNoteToCollection(
        new Types.ObjectId(addNoteToCollectionDto.userId),
        addNoteToCollectionDto.collectionSlug,
        newNote,
      );

      return BaseResponse.success<string>(
        "Note added to collection successfully.",
        "Note added.",
      );
    } catch (error) {
      return BaseResponse.error<string>(
        "Note could not be added to collection.",
        error.message,
      );
    }
  };

  getNote = async (
    getCollectionNoteBySlugDto: GetNote,
  ): Promise<BaseResponse<NoteDto>> => {
    try {
      getCollectionNoteBySlugDto.validate();
      const note = await this.collectionsRepository.getCollectionNote(
        new Types.ObjectId(getCollectionNoteBySlugDto.userId),
        getCollectionNoteBySlugDto.collectionSlug,
        new Types.ObjectId(getCollectionNoteBySlugDto.noteId),
      );
      return BaseResponse.success<NoteDto>(
        "Collection note retrieved successfully.",
        NoteDto.fromEntity(note),
      );
    } catch (error) {
      return BaseResponse.error<NoteDto>(
        "Collection note could not be retrieved.",
        error.message,
      );
    }
  };

  getNotes = async (
    getNotesDto: GetNotesDto,
  ): Promise<BaseResponse<NoteDto[]>> => {
    try {
      getNotesDto.validate();
      const notes = await this.collectionsRepository.getCollectionNotes(
        new Types.ObjectId(getNotesDto.userId),
        getNotesDto.collectionSlug,
      );
      return BaseResponse.success<NoteDto[]>(
        "Collection notes retrieved successfully.",
        notes.map((note) => NoteDto.fromEntity(note)),
      );
    } catch (error) {
      return BaseResponse.error<NoteDto[]>(
        "Collection notes could not be retrieved.",
        error.message,
      );
    }
  };

  deleteNoteFromCollection = async (
    deleteNoteDto: DeleteNoteDto,
  ): Promise<BaseResponse<string>> => {
    try {
      deleteNoteDto.validate();
      await this.collectionsRepository.removeNoteFromCollection(
        new Types.ObjectId(deleteNoteDto.userId),
        deleteNoteDto.collectionSlug,
        new Types.ObjectId(deleteNoteDto.noteId),
      );
      return BaseResponse.success<string>(
        "Collection note removed successfully.",
        "Collection note removed.",
      );
    } catch (error) {
      return BaseResponse.error<string>(
        "Collection note could not be removed.",
        error.message,
      );
    }
  };

  updateNoteInCollection = async (
    updateNoteDto: UpdateNoteDto,
  ): Promise<BaseResponse<string>> => {
    try {
      updateNoteDto.validate();
      const newNote = new NoteEntity({
        title: updateNoteDto.note.title,
        body: updateNoteDto.note.body,
        tags: updateNoteDto.note.tags.map(
          (tag) => new TagEntity({ name: tag.name }),
        ),
      });
      await this.collectionsRepository.updateNoteInCollection(
        new Types.ObjectId(updateNoteDto.userId),
        updateNoteDto.collectionSlug,
        new Types.ObjectId(updateNoteDto.noteId),
        newNote,
      );
      return BaseResponse.success<string>(
        "Collection note updated successfully.",
        "Collection note updated.",
      );
    } catch (error) {
      return BaseResponse.error<string>(
        "Collection note could not be updated.",
        error.message,
      );
    }
  };
}

export default CollectionsApplication;
