import Dto from "../../../common/dto";
import { z } from "zod";

class DeleteNoteDto extends Dto {
  userId: string;
  noteId: string;

  constructor(userId: string, noteId: string) {
    super();
    this.userId = userId;
    this.noteId = noteId;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, { message: "User ID is required" }),
      noteId: z.string().min(1, { message: "Note ID is required" }),
    });

    const validationResult = validator.safeParse(this);

    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default DeleteNoteDto;
