import mongoose, { Document, Model, Schema } from 'mongoose';
import { INoteDocument, noteSchema } from './note.model';
import { ITagDocument, tagSchema } from './tag.model';

export interface IUserDocument extends Document {
  name: string;
  username: string;
  email: string;
  salt: string;
  password: string;
  profilePicture: string;
  emailVerified: boolean;
  verificationToken: string;
  notes: INoteDocument[];
  tags: ITagDocument[];
}

const userSchema = new Schema<IUserDocument>({
  name: String,
  username: String,
  email: String,
  salt: String,
  password: String,
  profilePicture: String,
  emailVerified: Boolean,
  verificationToken: String,
  notes: { type: [noteSchema], default: [] },
  tags: { type: [tagSchema], default: [] }
}, { timestamps: true });

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema);

export default UserModel;

