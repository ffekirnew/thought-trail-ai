import { Types } from "mongoose";

abstract class BaseEntity {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default BaseEntity;
