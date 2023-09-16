import { JournalEntity } from "../../../../domain/entities";

class JournalDto {
  _id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, title: string, body: string, createdAt: Date, updatedAt: Date) {
    this._id = id;
    this.title = title;
    this.body = body;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromEntity(journal: JournalEntity) {
    return new JournalDto(journal._id.toString(), journal.title, journal.body, journal.createdAt, journal.updatedAt);
  }

}

export default JournalDto;
