import { Request, Response } from "express";
import { NotesRepository } from "../../persistence/repositories";
import NotesApplication from "../../application/features/notes/notes.application";
import {
  CreateNoteDto,
  DeleteNoteDto,
  GetAllNotesDto,
  GetNoteDto,
  UpdateNoteDto,
} from "../../application/features/notes/dtos";

class NotesController {
  notesApplication: NotesApplication;

  constructor() {
    const notesRepository = new NotesRepository();
    this.notesApplication = new NotesApplication(notesRepository);
  }

  create = async (req: Request, res: Response) => {
    const { title, body, tags, userId } = req.body;
    const createNoteDto = new CreateNoteDto(userId, title, body, tags);

    const response = await this.notesApplication.create(createNoteDto);

    if (response.success) res.status(201).send(response);
    else res.status(400).send(response);
  };

  getAll = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const getAllNotesDto = new GetAllNotesDto(userId);

    const response = await this.notesApplication.getAll(getAllNotesDto);
    if (response.success) res.status(200).send(response);
    else res.status(400).send(response);
  };

  get = async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const { userId } = req.body;
    const getNoteDto = new GetNoteDto(userId, noteId);

    const response = await this.notesApplication.get(getNoteDto);
    if (response.success) res.status(200).send(response);
    else res.status(400).send(response);
  };

  update = async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const { userId, title, body, tags } = req.body;
    const updateNoteDto = new UpdateNoteDto(userId, noteId, title, body, tags);

    const response = await this.notesApplication.update(updateNoteDto);
    if (response.success) res.status(204).send(response);
    else res.status(400).send(response);
  };

  delete = async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const { userId } = req.body;
    const deleteNoteDto = new DeleteNoteDto(userId, noteId);

    const response = await this.notesApplication.delete(deleteNoteDto);
    if (response.success) res.status(204).send(response);
    else res.status(400).send(response);
  };
}

export default NotesController;
