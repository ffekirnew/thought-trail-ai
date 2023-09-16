import { Types } from "mongoose";
import { IJournalsRepository } from "../../application/contracts/persistence";
import { JournalEntity } from "../../domain/entities";
import { UserModel } from "../models";

class JournalRepository implements IJournalsRepository {
  private async execute<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getJournal(userId: Types.ObjectId, journalId: Types.ObjectId): Promise<JournalEntity | null> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const journal = user.journals.find((journal) => journal._id.equals(journalId));

      if (!journal) {
        throw new Error("Journal not found");
      }
      return this.toJournalEntity(journal);
    });
  }

  async getAllJournals(userId: Types.ObjectId): Promise<JournalEntity[]> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      return user.journals.map((journal) => this.toJournalEntity(journal));
    });
  }

  async createJournal(userId: Types.ObjectId, journal: JournalEntity): Promise<Types.ObjectId> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const journalDocument = this.toJournalDocument(journal);
      user.journals.push(journalDocument);
      await user.save();

      return journalDocument._id;
    });
  }

  async deleteJournal(userId: Types.ObjectId, journalId: Types.ObjectId): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const journalIndex = user.journals.findIndex((journal) => journal._id.equals(journalId));
      if (journalIndex === -1) {
        throw new Error("Journal not found");
      }

      user.journals.splice(journalIndex, 1);
      await user.save();
    });
  }

  async updateJournal(userId: Types.ObjectId, journalId: Types.ObjectId, journal: JournalEntity): Promise<void> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const journalIndex = user.journals.findIndex((n) => n._id.equals(journalId));
      if (journalIndex === -1) {
        throw new Error("Journal not found");
      }

      user.journals[journalIndex] = this.toJournalDocument(journal);
      await user.save();
    });
  }

  private toJournalEntity(journalDocument: any): JournalEntity {
    const journal = new JournalEntity({
      _id: journalDocument._id,
      title: journalDocument.title,
      body: journalDocument.body,
      createdAt: journalDocument.createdAt,
      updatedAt: journalDocument.updatedAt
    });
    return journal;
  }

  private toJournalDocument(journal: JournalEntity): any {
    const journalDocument: any = {
      title: journal.title,
      body: journal.body,
    };
    return journalDocument;
  }
}

export default JournalRepository;

