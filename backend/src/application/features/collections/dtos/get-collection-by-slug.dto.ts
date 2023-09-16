import { z } from "zod";
import Dto from "../../../common/dto";

class GetCollectionBySlugDto implements Dto {
  userId: string;
  collectionSlug: string;

  constructor(userId: string, collectionSlug: string) {
    this.userId = userId;
    this.collectionSlug = collectionSlug;
  }

  validate(): void {
    const validator = z.object({ 
      userId: z.string().min(1, {message: 'User ID is required'}),
      collectionSlug: z.string().min(1, {message: 'Collection slug is required'}),
    });

    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.message);
    }
  }
}

export default GetCollectionBySlugDto;
