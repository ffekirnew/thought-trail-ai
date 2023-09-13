import NoteEntity from "./note.entity";
import BaseEntity from "../common/base.entity";
import TagEntity from "./tag.entity";

class UserEntity extends BaseEntity {
  name: string;
  username: string;
  email: string;
  salt: string;
  password: string;
  profilePicture: string;
  emailVerified: boolean;
  verificationToken: string;
  notes: NoteEntity[];
  tags: TagEntity[];

  constructor(user: Partial<UserEntity>) {
    super();
    Object.assign(this, user);
  }
}

export default UserEntity;
