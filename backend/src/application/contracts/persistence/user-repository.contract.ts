import { Types } from "mongoose";
import IGenericRepository from "./generic-repository.contract";
import UserEntity from "../../../domain/entities/user.entity";

abstract class IUserRepository implements IGenericRepository<UserEntity> {
  create: (entity: UserEntity) => Promise<Types.ObjectId>;
  update: (entity: UserEntity) => Promise<void>;
  delete: (_id: Types.ObjectId) => Promise<void>;
  getAll: () => Promise<UserEntity[]>;
  get: (_id: Types.ObjectId) => Promise<UserEntity | null>;
  getByUsername: (username: string) => Promise<UserEntity | null>;
  getByEmail: (email: string) => Promise<UserEntity | null>;
}

export default IUserRepository;
