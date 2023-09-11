import mongoose, { Document, Schema, Model } from "mongoose";

interface INoteDocument extends Document {
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INoteDocument>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const NoteModel: Model<INoteDocument> = mongoose.model("Note", noteSchema);

export default NoteModel;
