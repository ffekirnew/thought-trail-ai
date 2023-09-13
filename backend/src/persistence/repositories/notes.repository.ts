import { Types } from "mongoose";
import { INotesRepository } from "../../application/contracts/persistence";
import { NoteEntity } from "../../domain/entities";
import { UserModel } from "../models";

class NoteRepository implements INotesRepository {
  private async execute<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getNote(userId: Types.ObjectId, noteId: Types.ObjectId): Promise<NoteEntity | null> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const note = user.notes.find((note) => note._id.equals(noteId));

      if (!note) {
        throw new Error("Note not found");
      }
      return this.toNoteEntity(note);
    });
  }

  async getAllNotes(userId: Types.ObjectId): Promise<NoteEntity[]> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      return user.notes.map((note) => this.toNoteEntity(note));
    });
  }

  async createNote(userId: Types.ObjectId, note: NoteEntity): Promise<Types.ObjectId> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const noteDocument = this.toNoteDocument(note);
      user.notes.push(noteDocument);
      await user.save();

      return noteDocument._id;
    });
  }

  async deleteNote(userId: Types.ObjectId, noteId: Types.ObjectId): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const noteIndex = user.notes.findIndex((note) => note._id.equals(noteId));
      if (noteIndex === -1) {
        throw new Error("Note not found");
      }

      user.notes.splice(noteIndex, 1);
      await user.save();
    });
  }

  async updateNote(userId: Types.ObjectId, noteId: Types.ObjectId, note: NoteEntity): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const noteIndex = user.notes.findIndex((n) => n._id.equals(noteId));
      if (noteIndex === -1) {
        throw new Error("Note not found");
      }

      user.notes[noteIndex] = this.toNoteDocument(note);
      await user.save();
    });
  }

  private toNoteEntity(noteDocument: any): NoteEntity {
    const note = new NoteEntity({
      _id: noteDocument._id,
      title: noteDocument.title,
      content: noteDocument.content,
      tags: noteDocument.tags,
    });
    return note;
  }

  private toNoteDocument(note: NoteEntity): any {
    const noteDocument: any = {
      title: note.title,
      content: note.content,
      tags: note.tags,
    };
    return noteDocument;
  }
}

export default NoteRepository;

