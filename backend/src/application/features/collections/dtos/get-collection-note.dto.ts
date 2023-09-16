import { z } from "zod";
import Dto from "../../../common/dto";

class GetCollectionNoteDto implements Dto {
  userId: string;
  collectionId: string;
  noteId: string;

  constructor(userId: string, collectionId: string, noteId: string) {
    this.userId = userId;
    this.collectionId = collectionId;
    this.noteId = noteId;
  }

  validate(): void {
    const validator = z.object({ 
      userId: z.string().min(1, {message: 'User ID is required'}),
      collectionId: z.string().min(1, {message: 'Collection ID is required'}),
      noteId: z.string().min(1, {message: 'Note ID is required'}),
    });

    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default GetCollectionNoteDto;
