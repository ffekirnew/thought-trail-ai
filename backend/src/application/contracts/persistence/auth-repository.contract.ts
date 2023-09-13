import { Types } from "mongoose";
import { UserEntity } from "../../../domain/entities";

abstract class IAuthRepository {
  create: (entity: UserEntity) => Promise<Types.ObjectId>;
  update: (entity: UserEntity) => Promise<void>;
  delete: (_id: Types.ObjectId) => Promise<void>;
  get: (_id: Types.ObjectId) => Promise<UserEntity | null>;
  getByUsername: (username: string) => Promise<UserEntity | null>;
  getByEmail: (email: string) => Promise<UserEntity | null>;
}

export default IAuthRepository;
