import { Types } from "mongoose";

class NoteEntity {
  _id: Types.ObjectId;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default NoteEntity;
