import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  username: string;
  email: string;
  salt: string;
  password: string;
  profilePicture: string;
  emailVerified: boolean;
  verificationToken: string;
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
});

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema);

export default UserModel;
