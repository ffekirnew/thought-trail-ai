import { Types } from "mongoose";
import Dto from "../../../common/dto";
import { z } from "zod";
import { TagDto } from "../../tags/dtos";

class UpdateNoteDto implements Dto {
  userId: Types.ObjectId;
  noteId: Types.ObjectId;
  title: string;
  content: string;
  tags: TagDto[];

  constructor(userId: Types.ObjectId, noteId: Types.ObjectId, title: string, content: string, tags: TagDto[]) {
    this.userId = userId;
    this.noteId = noteId;
    this.title = title;
    this.content = content;
    this.tags = tags;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, 'User ID is required'),
      noteId: z.string().min(1, 'Note ID is required'),
      title: z.string().min(1, 'Title is required'),
      content: z.string().min(1, 'Body is required'),
    });

    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.errors[0].message);
    }
  }
}

export default UpdateNoteDto;

