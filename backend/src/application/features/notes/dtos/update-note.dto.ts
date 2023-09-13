import Dto from "../../../common/dto";
import { z } from "zod";
import { TagDto } from "../../tags/dtos";

class UpdateNoteDto implements Dto {
  userId: string;
  noteId: string;
  title: string;
  body: string;
  tags: TagDto[];

  constructor(userId: string, noteId: string, title: string, content: string, tags: TagDto[]) {
    this.userId = userId;
    this.noteId = noteId;
    this.title = title;
    this.body = content;
    this.tags = tags;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, {message: 'User ID is required'}),
      noteId: z.string().min(1, {message: 'Note ID is required'}),
      title: z.string().min(1, {message: 'Title is required'}),
      body: z.string().min(1, {message: 'Body is required'}),
    });

    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default UpdateNoteDto;

