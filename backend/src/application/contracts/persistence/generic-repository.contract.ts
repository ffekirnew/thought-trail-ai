import { Types } from "mongoose";

interface IGenericRepository<T> {
  create: (entity: T) => Promise<Types.ObjectId>;
  update: (entity: T) => Promise<void>;
  delete: (_id: Types.ObjectId) => Promise<void>;
  getAll: () => Promise<T[]>;
  get: (_id: Types.ObjectId) => Promise<T | null>;
}

export default IGenericRepository;

