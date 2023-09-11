import INotesRepository from "../../contracts/persistence/notes-repository.contract";
import CreateNoteDto from "./dtos/create-note.dto";
import DeleteNoteDto from "./dtos/delete-note.dto";
import UpdateNoteDto from "./dtos/update-note.dto";

class NotesApplication {
  constructor(
    private readonly notesRepository: INotesRepository
  ) {}

  create = async (createNoteDto: CreateNoteDto) => {}
  update = async (updateNoteDto: UpdateNoteDto) => {}
  delete = async (deleteNoteDto: DeleteNoteDto) => {}
  getAll = async (_id)
}
