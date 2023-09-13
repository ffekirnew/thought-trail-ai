import { Types } from 'mongoose';
import UserModel from '../models/user.model';
import UserEntity from '../../domain/entities/user.entity';
import { IAuthRepository } from '../../application/contracts/persistence';

class AuthRepository implements IAuthRepository {
  private async execute<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(entity: UserEntity): Promise<Types.ObjectId> {
    return this.execute(async () => {
      const userDocument = this.toUserDocument(entity);
      const savedUser = await UserModel.create(userDocument);
      return savedUser._id;
    });
  }

  async update(entity: UserEntity): Promise<void> {
    return this.execute(async () => {
      const userDocument = this.toUserDocument(entity);
      await UserModel.findByIdAndUpdate(entity._id, userDocument);
    });
  }

  async delete(_id: Types.ObjectId): Promise<void> {
    return this.execute(async () => {
      await UserModel.findByIdAndDelete(_id);
    });
  }

  async getAll(): Promise<UserEntity[]> {
    return this.execute(async () => {
      const users = await UserModel.find().exec();
      return users.map(this.toUserEntity);
    });
  }

  async get(_id: Types.ObjectId): Promise<UserEntity | null> {
    return this.execute(async () => {
      const user = await UserModel.findById(_id).exec();
      return user ? this.toUserEntity(user) : null;
    });
  }

  async getByUsername(username: string): Promise<UserEntity | null> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ username }).exec();
      return user ? this.toUserEntity(user) : null;
    });
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    return this.execute(async () => {
      const user = await UserModel.findOne({ email }).exec();
      return user ? this.toUserEntity(user) : null;
    });
  }

  private toUserEntity(document: any): UserEntity {
    return new UserEntity({
      _id: document._id,
      name: document.name,
      username: document.username,
      email: document.email,
      salt: document.salt,
      password: document.password,
      profilePicture: document.profilePicture,
      emailVerified: document.emailVerified,
      verificationToken: document.verificationToken,
      notes: document.notes,
      tags: document.tags,
    });
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
      notes: entity.notes,
      tags: entity.tags,
    };
  }
}

export default AuthRepository;

