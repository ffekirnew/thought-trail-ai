import mongoose, { Document, Schema, Model } from "mongoose";

export interface IJournalDocument extends Document {
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export const journalSchema = new Schema<IJournalDocument>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true },
);

const JournalModel: Model<IJournalDocument> = mongoose.model(
  "Journal",
  journalSchema,
);

export default JournalModel;
