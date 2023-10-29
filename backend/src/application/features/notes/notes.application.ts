import { create } from "domain";
import { NoteEntity, TagEntity } from "../../../domain/entities";
import { INotesRepository } from "../../contracts/persistence";
import { BaseResponse } from "../../responses";
import {
  CreateNoteDto,
  UpdateNoteDto,
  DeleteNoteDto,
  GetAllNotesDto,
  GetNoteDto,
  NoteDto,
} from "./dtos";
import { Types } from "mongoose";

class NotesApplication {
  constructor(private readonly notesRepository: INotesRepository) {}

  create = async (
    createNoteDto: CreateNoteDto,
  ): Promise<BaseResponse<Types.ObjectId>> => {
    try {
      createNoteDto.validate();
      const newNote = new NoteEntity({
        title: createNoteDto.title,
        body: createNoteDto.body,
        tags: createNoteDto.tags.map(
          (tag) => new TagEntity({ name: tag.name }),
        ),
      });

      const id = await this.notesRepository.createNote(
        new Types.ObjectId(createNoteDto.userId),
        newNote,
      );
      console.log(id);
      return BaseResponse.success<Types.ObjectId>(
        "Note created successfully.",
        id,
      );
    } catch (error) {
      return BaseResponse.error<Types.ObjectId>(
        "Note creation failed.",
        error.message,
      );
    }
  };

  update = async (
    updateNoteDto: UpdateNoteDto,
  ): Promise<BaseResponse<void>> => {
    try {
      updateNoteDto.validate();
      const newNote = new NoteEntity({
        title: updateNoteDto.title,
        body: updateNoteDto.body,
        tags: updateNoteDto.tags.map(
          (tag) => new TagEntity({ name: tag.name }),
        ),
      });

      await this.notesRepository.updateNote(
        new Types.ObjectId(updateNoteDto.userId),
        new Types.ObjectId(updateNoteDto.noteId),
        newNote,
      );
      return BaseResponse.success<void>("Note updation successfully.", null);
    } catch (error) {
      return BaseResponse.error<void>("Note updation failed.", error.message);
    }
  };

  delete = async (
    deleteNoteDto: DeleteNoteDto,
  ): Promise<BaseResponse<void>> => {
    try {
      deleteNoteDto.validate();
      await this.notesRepository.deleteNote(
        new Types.ObjectId(deleteNoteDto.userId),
        new Types.ObjectId(deleteNoteDto.noteId),
      );
      return BaseResponse.success<void>("Note deleted successfully.", null);
    } catch (error) {
      return BaseResponse.error<void>("Note deletion failed.", error.message);
    }
  };

  getAll = async (
    getAllNotesDto: GetAllNotesDto,
  ): Promise<BaseResponse<NoteDto[]>> => {
    try {
      getAllNotesDto.validate();
      const notes = await this.notesRepository.getAllNotes(
        new Types.ObjectId(getAllNotesDto.userId),
      );

      return BaseResponse.success<NoteDto[]>(
        "Notes retrieved successfully.",
        notes.map((note) => NoteDto.fromEntity(note)),
      );
    } catch (error) {
      return BaseResponse.error<NoteDto[]>(
        "Notes could not be retrieved.",
        error.message,
      );
    }
  };

  get = async (getNoteDto: GetNoteDto): Promise<BaseResponse<NoteDto>> => {
    try {
      getNoteDto.validate();
      const note = await this.notesRepository.getNote(
        new Types.ObjectId(getNoteDto.userId),
        new Types.ObjectId(getNoteDto.noteId),
      );
      return BaseResponse.success<NoteDto>(
        "Note retrieved successfully.",
        NoteDto.fromEntity(note),
      );
    } catch (error) {
      return BaseResponse.error<NoteDto>(
        "Note could not be retrieved.",
        error.message,
      );
    }
  };
}

export default NotesApplication;
