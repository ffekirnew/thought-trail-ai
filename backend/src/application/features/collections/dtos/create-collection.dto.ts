import { z } from "zod";
import Dto from "../../../common/dto";

class CreateCollectionDto implements Dto {
  userId: string;
  name: string;
  description: string;

  constructor(userId: string, name: string, description: string) {
    this.userId = userId;
    this.name = name;
    this.description = description;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, { message: "User ID is required" }),
      name: z.string().min(1, { message: "Collection name is required" }),
      description: z
        .string()
        .min(1, { message: "Collection description is required" }),
    });

    const validationResult = validator.safeParse(this);

    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default CreateCollectionDto;
