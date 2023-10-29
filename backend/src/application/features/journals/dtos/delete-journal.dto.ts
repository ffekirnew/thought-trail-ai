import Dto from "../../../common/dto";
import { z } from "zod";

class DeleteJournalDto extends Dto {
  userId: string;
  journalId: string;

  constructor(userId: string, journalId: string) {
    super();
    this.userId = userId;
    this.journalId = journalId;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, { message: "User ID is required" }),
      journalId: z.string().min(1, { message: "Journal ID is required" }),
    });

    const validationResult = validator.safeParse(this);

    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default DeleteJournalDto;
