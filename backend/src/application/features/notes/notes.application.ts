import { Types } from "mongoose";
import INotesRepository from "../../contracts/persistence/notes-repository.contract";
import { CreateNoteDto, DeleteNoteDto, UpdateNoteDto } from "./dtos";

class NotesApplication {
  constructor(
    private readonly notesRepository: INotesRepository
  ) {}

  create = async (createNoteDto: CreateNoteDto) => {}
  update = async (updateNoteDto: UpdateNoteDto) => {}
  delete = async (deleteNoteDto: DeleteNoteDto) => {}
  getAll = async (_id: Types.ObjectId) => {}
}
