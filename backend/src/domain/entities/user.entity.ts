import { Types } from "mongoose";

class UserEntity {
  _id: Types.ObjectId;
  name: string;
  username: string;
  email: string;
  salt: string;
  password: string;
  profilePicture: string;
  emailVerified: boolean;
  verificationToken: string;
}

export default UserEntity;
