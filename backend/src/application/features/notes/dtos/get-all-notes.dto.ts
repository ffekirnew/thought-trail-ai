import { z } from "zod";
import Dto from "../../../common/dto";

class GetAllNotesDto implements Dto {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, { message: "User ID is required" }),
    });

    const validationResult = validator.safeParse(this);

    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default GetAllNotesDto;
