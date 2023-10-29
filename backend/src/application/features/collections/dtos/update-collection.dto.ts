import Dto from "../../../common/dto";
import { z } from "zod";

class UpdateCollectionDto implements Dto {
  userId: string;
  collectionId: string;
  name: string;
  description: string;

  constructor(
    userId: string,
    collectionId: string,
    title: string,
    content: string,
  ) {
    this.userId = userId;
    this.collectionId = collectionId;
    this.name = title;
    this.description = content;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, { message: "User ID is required" }),
      collectionId: z.string().min(1, { message: "Collection ID is required" }),
      title: z.string().min(1, { message: "Title is required" }),
      body: z.string().min(1, { message: "Body is required" }),
    });

    const validationResult = validator.safeParse(this);

    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default UpdateCollectionDto;
