import { z } from "zod";
import Dto from "../../../common/dto";
import { Types } from "mongoose";

class CreateTagDto implements Dto {
  userId: Types.ObjectId;
  name: string;

  constructor(name: string, userId: Types.ObjectId) {
    this.name = name;
    this.userId = userId;
  }
  
  validate(): void {
    const validator = z.object({ 
      userId: z.string().min(1, 'User ID is required'),
      name: z.string().min(1, 'Name is required').regex(/^[A-Za-z]+$/, 'Name must contain only alphabetic characters'),
    });

    const validationResult = validator.safeParse(this);
  
    if (validationResult.success === false) {
      throw new Error(validationResult.error.errors[0].message);
    } 
  }
}

export default CreateTagDto;
