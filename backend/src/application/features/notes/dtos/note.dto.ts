import { Types } from "mongoose";

class NoteDto {
  _id: Types.ObjectId;
  title: string;
  body: string;
  tags: string[];

  constructor(title: string, body: string, tags: string[]) {
    this.title = title;
    this.body = body;
    this.tags = tags;
  }

}

export default NoteDto;
