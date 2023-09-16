import Dto from "../../../../common/dto";
import { z } from "zod";

class GetNoteDto implements Dto {
  userId: string;
  collectionSlug: string;
  noteId: string;

  constructor(userId: string, collectionSlug: string, noteId: string) {
    this.userId = userId;
    this.collectionSlug = collectionSlug;
    this.noteId = noteId;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, {message: 'User ID is required'}),
      collectionSlug: z.string().min(1, {message: 'Collection ID is required'}),
      noteId: z.string().min(1, {message: 'Note ID is required'}),
    });

    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default GetNoteDto;

