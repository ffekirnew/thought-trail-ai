import mongoose, { Document, Schema, Model } from "mongoose";

export interface ITagDocument extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const tagSchema = new Schema<ITagDocument>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const TagModel: Model<ITagDocument> = mongoose.model("Tag", tagSchema);

export default TagModel;
