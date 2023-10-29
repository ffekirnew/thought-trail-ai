import { z } from "zod";
import Dto from "../../../common/dto";

class GetCollectionDto implements Dto {
  userId: string;
  collectionId: string;

  constructor(userId: string, collectionId: string) {
    this.userId = userId;
    this.collectionId = collectionId;
  }

  validate(): void {
    const validator = z.object({
      userId: z.string().min(1, { message: "User ID is required" }),
      collectionId: z.string().min(1, { message: "Collection ID is required" }),
    });

    const validationResult = validator.safeParse(this);

    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default GetCollectionDto;
