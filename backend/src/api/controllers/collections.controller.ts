import { Request, Response } from "express";
import { CollectionsRepository, NotesRepository } from "../../persistence/repositories";
import CollectionsApplication from "../../application/features/collections/collections.application";
import { AddNoteToCollectionDto, CreateCollectionDto, DeleteCollectionDto, GetAllCollectionsDto, GetCollectionBySlugDto, GetCollectionDto, UpdateCollectionDto } from "../../application/features/collections/dtos";
import Slugify from "../../infrastructure/slug/slugify";
import { CreateNoteDto } from "../../application/features/notes/dtos";

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
    const { collectionId } = req.params;
    const { userId, note } = req.body;

    const newNoteDto = new CreateNoteDto(userId, note.title, note.body, note.tags);
    const addNoteToCollectionDto = new AddNoteToCollectionDto(userId, collectionId, newNoteDto);

    const response = await this.collectionsApplication.addNoteToCollection(addNoteToCollectionDto);
    if (response.success)
      res.status(204).send(response);
    else
      res.status(400).send(response);
  }
}

export default CollectionsController;
