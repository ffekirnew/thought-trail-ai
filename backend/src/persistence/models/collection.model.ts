import mongoose, { Document, Schema, Model } from "mongoose";
import { INoteDocument, noteSchema } from "./note.model";

export interface ICollectionDocument extends Document {
  slug: string;
  name: string;
  description: string;
  notes: INoteDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export const collectionSchema = new Schema<ICollectionDocument>({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  notes: { type: [noteSchema], default: [] }
}, { timestamps: true });

const CollectionModel: Model<ICollectionDocument> = mongoose.model("Collection", collectionSchema);

export default CollectionModel;
