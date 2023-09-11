import { Types } from "mongoose";
import NoteEntity from "../../../domain/entities/note.entity";
import IGenericRepository from "./generic-repository.contract";

abstract class INotesRepository implements IGenericRepository<NoteEntity> {
    create: (entity: NoteEntity) => Promise<Types.ObjectId>;
    update: (entity: NoteEntity) => Promise<void>;
    delete: (_id: Types.ObjectId) => Promise<void>;
    getAll: () => Promise<NoteEntity[]>;
    get: (_id: Types.ObjectId) => Promise<NoteEntity>;

    getAllByUserId: (userId: Types.ObjectId) => Promise<NoteEntity[]>;
}

export default INotesRepository;
