import Dto from "../../../common/dto";
import { z } from "zod";

class UpdateJournalDto implements Dto {
  userId: string;
  journalId: string;
  title: string;
  body: string;

  constructor(
    userId: string,
    journalId: string,
    title: string,
    content: string,
  ) {
    this.userId = userId;
    this.journalId = journalId;
    this.title = title;
    this.body = content;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, { message: "User ID is required" }),
      journalId: z.string().min(1, { message: "Journal ID is required" }),
      title: z.string().min(1, { message: "Title is required" }),
      body: z.string().min(1, { message: "Body is required" }),
    });

    const validationResult = validator.safeParse(this);

    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default UpdateJournalDto;
