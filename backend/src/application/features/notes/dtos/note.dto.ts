import { Types } from "mongoose";
import { TagDto } from "../../tags/dtos";
import { NoteEntity } from "../../../../domain/entities";

class NoteDto {
  _id: Types.ObjectId;
  title: string;
  body: string;
  tags: TagDto[];

  constructor(id: Types.ObjectId, title: string, body: string, tags: TagDto[]) {
    this._id = id;
    this.title = title;
    this.body = body;
    this.tags = tags;
  }

  static fromEntity(note: NoteEntity) {
    return new NoteDto(note._id, note.title, note.content, note.tags.map(tag => TagDto.fromEntity(tag)));
  }

}

export default NoteDto;
