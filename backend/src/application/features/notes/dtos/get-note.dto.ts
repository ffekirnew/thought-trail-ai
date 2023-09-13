import { Types } from "mongoose";
import { z } from "zod";
import Dto from "../../../common/dto";

class GetNoteDto implements Dto {
  userId: Types.ObjectId;
  noteId: Types.ObjectId;

  constructor(userId: Types.ObjectId, noteId: Types.ObjectId) {
    this.userId = userId;
    this.noteId = noteId;
  }

  validate(): void {
    const validator = z.object({ 
      userId: z.string().min(1, 'User ID is required'),
      noteId: z.string().min(1, 'Note ID is required'),
    });

    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.errors[0].message);
    }
  }
}

export default GetNoteDto;
