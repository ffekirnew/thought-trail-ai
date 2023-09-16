import Dto from "../../../common/dto";
import { z } from "zod";
import { CreateNoteDto } from "../../notes/dtos";

class AddNoteToCollectionDto implements Dto {
  userId: string;
  collectionId: string;
  note: CreateNoteDto;

  constructor(userId: string, collectionId: string, note: CreateNoteDto) {
    this.userId = userId;
    this.collectionId = collectionId;
    this.note = note;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, {message: 'User ID is required'}),
      collectionId: z.string().min(1, {message: 'Collection ID is required'}),
    });

    this.note.validate();
    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default AddNoteToCollectionDto;

