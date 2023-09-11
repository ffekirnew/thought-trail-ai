import { z } from "zod";
import Dto from "../../../common/dto";

class CreateNoteDto implements Dto {
  title: string;
  body: string;
  tags: string[];

  constructor(title: string, body: string, tags: string[]) {
    this.title = title;
    this.body = body;
    this.tags = tags;
  }

  validate(): void {
    const validator = z.object({ 
      title: z.string().min(1, 'Title is required'),
      body: z.string().min(1, 'Body is required'),
      tags: z.array(z.string()).min(1, 'Tags are required'),
    });

    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.errors[0].message);
    }
  }
}

export default CreateNoteDto;
