import { Request, Response } from "express";
import { CollectionsRepository, NotesRepository } from "../../persistence/repositories";
import CollectionsApplication from "../../application/features/collections/collections.application";
import { CreateCollectionDto, DeleteCollectionDto, GetAllCollectionsDto, GetCollectionBySlugDto, GetCollectionDto, UpdateCollectionDto } from "../../application/features/collections/dtos";
import Slugify from "../../infrastructure/slug/slugify";
import { CreateNoteDto } from "../../application/features/notes/dtos";
import { AddNoteDto, DeleteNoteDto, GetNote, GetNotes, UpdateNoteDto } from "../../application/features/collections/dtos/collection-note";

class CollectionsController {
  collectionsApplication: CollectionsApplication;

  constructor() {
    const notesRepsitory = new NotesRepository();
    const collectionsRepository = new CollectionsRepository(notesRepsitory);
    const slugify = new Slugify();
    this.collectionsApplication = new CollectionsApplication(collectionsRepository, slugify);
  }

  create = async (req: Request, res: Response) => {
    const { name, description, userId } = req.body;
    const createCollectionDto = new CreateCollectionDto(userId, name, description);

    const response = await this.collectionsApplication.create(createCollectionDto);

    if (response.success) 
      res.status(201).send(response);
    else
      res.status(400).send(response);
  }

  getAll = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const getAllCollectionsDto = new GetAllCollectionsDto(userId);

    const response = await this.collectionsApplication.getAll(getAllCollectionsDto);
    if (response.success) 
      res.status(200).send(response);
    else
      res.status(400).send(response);
  }

  get = async (req: Request, res: Response) => {
    const { collectionId } = req.params;
    const { userId } = req.body;
    const getCollectionDto = new GetCollectionDto(userId, collectionId);

    const response = await this.collectionsApplication.get(getCollectionDto);
    if (response.success) res.status(200).send(response);
    else res.status(400).send(response);
  } 

  getBySlug = async (req: Request, res: Response) => {
    const { collectionSlug } = req.params;
    const { userId } = req.body;
    const getCollectionDto = new GetCollectionBySlugDto(userId, collectionSlug);

    const response = await this.collectionsApplication.getBySlug(getCollectionDto);
    if (response.success) res.status(200).send(response);
    else res.status(400).send(response);
  }
  
  update = async (req: Request, res: Response) => {
    const { collectionId } = req.params;
    const { userId, name, description } = req.body;
    const updateCollectionDto = new UpdateCollectionDto(userId, collectionId, name, description);

    const response = await this.collectionsApplication.update(updateCollectionDto);
    if (response.success)
      res.status(204).send(response);
    else
      res.status(400).send(response);
  }

  delete = async (req: Request, res: Response) => {
    const { collectionId } = req.params;
    const { userId } = req.body;
    const deleteCollectionDto = new DeleteCollectionDto(userId, collectionId);

    const response = await this.collectionsApplication.delete(deleteCollectionDto);
    if (response.success)
      res.status(204).send(response);
    else
      res.status(400).send(response);
  } 

  addNoteToCollection = async (req: Request, res: Response) => {
    const { collectionSlug } = req.params;
    const { userId, note } = req.body;

    const newNoteDto = new CreateNoteDto(userId, note.title, note.body, note.tags);
    const addNoteToCollectionDto = new AddNoteDto(userId, collectionSlug, newNoteDto);

    const response = await this.collectionsApplication.addNoteToCollection(addNoteToCollectionDto);
    if (response.success)
      res.status(201).send(response);
    else
      res.status(400).send(response);
  }

  getNotes = async (req: Request, res: Response) => {
    const { collectionSlug } = req.params;
    const { userId } = req.body;
    const getCollectionNotesDto = new GetNotes(userId, collectionSlug);

    const response = await this.collectionsApplication.getNotes(getCollectionNotesDto);
    if (response.success) res.status(200).send(response);
    else res.status(400).send(response);
  }

  getNote = async (req: Request, res: Response) => {
    const { collectionSlug, noteId } = req.params;
    const { userId } = req.body;
    const getCollectionNoteDto = new GetNote(userId, collectionSlug, noteId);

    const response = await this.collectionsApplication.getNote(getCollectionNoteDto);
    if (response.success) res.status(200).send(response);
    else res.status(400).send(response);
  }
  
  updateNote = async (req: Request, res: Response) => {
    const { collectionSlug, noteId } = req.params;
    const { userId, note } = req.body;

    const noteDto = new CreateNoteDto(userId, note.title, note.body, note.tags);
    const updateNotedto = new UpdateNoteDto(userId, collectionSlug, noteId, noteDto);

    const response = await this.collectionsApplication.updateNoteInCollection(updateNotedto);
    if (response.success) res.status(204).send(response);
    else res.status(400).send(response);
  }

  deleteNote = async (req: Request, res: Response) => {
    const { collectionSlug, noteId } = req.params;
    const { userId } = req.body;

    const deleteNotedto = new DeleteNoteDto(userId, collectionSlug, noteId);

    const response = await this.collectionsApplication.deleteNoteFromCollection(deleteNotedto);
    if (response.success) res.status(204).send(response);
    else res.status(400).send(response);
  }
}

export default CollectionsController;
