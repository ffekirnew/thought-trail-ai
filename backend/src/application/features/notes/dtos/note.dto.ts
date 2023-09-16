import { TagDto } from "../../tags/dtos";
import { NoteEntity } from "../../../../domain/entities";

class NoteDto {
  _id: string;
  title: string;
  body: string;
  tags: TagDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, title: string, body: string, tags: TagDto[], createdAt: Date, updatedAt: Date) {
    this._id = id;
    this.title = title;
    this.body = body;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromEntity(note: NoteEntity) {
    return new NoteDto(note._id.toString(), note.title, note.body, note.tags.map(tag => TagDto.fromEntity(tag)), note.createdAt, note.updatedAt);
  }

}

export default NoteDto;
