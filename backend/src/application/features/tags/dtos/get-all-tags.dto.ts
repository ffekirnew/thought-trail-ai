import { z } from "zod";
import Dto from "../../../common/dto";
import { Types } from "mongoose";

class GetAllTagsDto implements Dto {
  userId: Types.ObjectId;

  constructor(userId: Types.ObjectId) {
    this.userId = userId;
  }
  
  validate(): void {
    const validator = z.object({ 
      userId: z.string().min(1, 'User ID is required'),
    });

    const validationResult = validator.safeParse(this);
  
    if (validationResult.success === false) {
      throw new Error(validationResult.error.errors[0].message);
    } 
  }
}

export default GetAllTagsDto;
