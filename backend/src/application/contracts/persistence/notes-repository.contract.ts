import { Types } from "mongoose";
import NoteEntity from "../../../domain/entities/note.entity";

abstract class INotesRepository {
  getNote: (userId: Types.ObjectId, noteId: Types.ObjectId) => Promise<NoteEntity | null>
  getAllNotes: (userId: Types.ObjectId) => Promise<NoteEntity[]>;
  createNote: (userId: Types.ObjectId, note: NoteEntity) => Promise<Types.ObjectId | null>;
  deleteNote: (userId: Types.ObjectId, noteId: Types.ObjectId) => Promise<void>;
  updateNote: (userId: Types.ObjectId, noteId: Types.ObjectId, note: NoteEntity) => Promise<void>;
}

export default INotesRepository;
