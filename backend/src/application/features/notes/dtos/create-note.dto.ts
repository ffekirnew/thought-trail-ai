import { z } from "zod";
import Dto from "../../../common/dto";
import { TagDto } from "../../tags/dtos";
import { Types } from "mongoose";

class CreateNoteDto implements Dto {
  userId: Types.ObjectId;
  title: string;
  content: string;
  tags: TagDto[];

  constructor(userId: Types.ObjectId, title: string, body: string, tags: TagDto[]) {
    this.userId = userId;
    this.title = title;
    this.content = body;
    this.tags = tags;
  }

  validate(): void {
    const validator = z.object({ 
      userId: z.string().min(1, 'User ID is required'),
      title: z.string().min(1, 'Title is required'),
      content: z.string().min(1, 'Body is required'),
    });

    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.errors[0].message);
    }
  }
}

export default CreateNoteDto;
