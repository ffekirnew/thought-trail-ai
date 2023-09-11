import { Types } from 'mongoose';
import UserModel from '../models/user.model';
import UserEntity from '../../domain/entities/user.entity';
import IUserRepository from '../../application/contracts/persistence/user-repository.contract';

class UserRepository implements IUserRepository {
  async create(entity: UserEntity): Promise<Types.ObjectId> {
    const userDocument = this.toUserDocument(entity);
    const savedUser = await UserModel.create(userDocument);
    return savedUser._id;
  }

  async update(entity: UserEntity): Promise<void> {
    const userDocument = this.toUserDocument(entity);
    await UserModel.findByIdAndUpdate(entity._id, userDocument);
  }

  async delete(_id: Types.ObjectId): Promise<void> {
    await UserModel.findByIdAndDelete(_id);
  }

  async getAll(): Promise<UserEntity[]> {
    const users = await UserModel.find().exec();
    return users.map(this.toUserEntity);
  }

  async get(_id: Types.ObjectId): Promise<UserEntity | null> {
    const user = await UserModel.findById(_id).exec();
    return user ? this.toUserEntity(user) : null;
  }

  async getByUsername(username: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ username }).exec();
    return user ? this.toUserEntity(user) : null;
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email }).exec();
    return user ? this.toUserEntity(user) : null;
  }

  private toUserEntity(document: any): UserEntity {
    return {
      _id: document._id,
      name: document.name,
      username: document.username,
      email: document.email,
      salt: document.salt,
      password: document.password,
      profilePicture: document.profilePicture,
      emailVerified: document.emailVerified,
      verificationToken: document.verificationToken,
    };
  }

  private toUserDocument(entity: UserEntity): any {
    return {
      name: entity.name,
      username: entity.username,
      email: entity.email,
      salt: entity.salt,
      password: entity.password,
      profilePicture: entity.profilePicture,
      emailVerified: entity.emailVerified,
      verificationToken: entity.verificationToken,
    };
  }
}

export default UserRepository;

