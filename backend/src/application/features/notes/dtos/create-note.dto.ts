import { z } from "zod";
import Dto from "../../../common/dto";
import { TagDto } from "../../tags/dtos";

class CreateNoteDto implements Dto {
  userId: string;
  title: string;
  body: string;
  tags: TagDto[];

  constructor(userId: string, title: string, body: string, tags: TagDto[]) {
    this.userId = userId;
    this.title = title;
    this.body = body;
    this.tags = tags;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, { message: "User ID is required" }),
      title: z.string().min(1, { message: "Title is required" }),
      body: z.string().min(1, { message: "Body is required" }),
    });

    const validationResult = validator.safeParse(this);

    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default CreateNoteDto;
