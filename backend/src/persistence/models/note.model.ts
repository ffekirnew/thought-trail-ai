import mongoose, { Document, Schema, Model } from "mongoose";
import { ITagDocument, tagSchema } from "./tag.model";

export interface INoteDocument extends Document {
  title: string;
  body: string;
  tags: ITagDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export const noteSchema = new Schema<INoteDocument>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: { type: [tagSchema], default: [] },
  },
  { timestamps: true },
);

const NoteModel: Model<INoteDocument> = mongoose.model("Note", noteSchema);

export default NoteModel;
