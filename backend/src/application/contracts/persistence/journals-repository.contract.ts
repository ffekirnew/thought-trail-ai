import { Types } from "mongoose";
import JournalEntity from "../../../domain/entities/journal.entity";

abstract class IJournalsRepository {
  getJournal: (
    userId: Types.ObjectId,
    journalId: Types.ObjectId,
  ) => Promise<JournalEntity | null>;
  getAllJournals: (
    userId: Types.ObjectId,
    orderBy: string,
    ordering: string,
  ) => Promise<JournalEntity[]>;
  createJournal: (
    userId: Types.ObjectId,
    journal: JournalEntity,
  ) => Promise<Types.ObjectId | null>;
  deleteJournal: (
    userId: Types.ObjectId,
    journalId: Types.ObjectId,
  ) => Promise<void>;
  updateJournal: (
    userId: Types.ObjectId,
    journalId: Types.ObjectId,
    journal: JournalEntity,
  ) => Promise<void>;
}

export default IJournalsRepository;
