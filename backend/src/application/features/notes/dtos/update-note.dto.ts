import { Types } from "mongoose";
import Dto from "../../../common/dto";
import { z } from "zod";

class UpdateNoteDto implements Dto {
  _id: Types.ObjectId;
  title: string;
  body: string;
  tags: string[];

  constructor(_id: Types.ObjectId, title: string, body: string, tags: string[]) {
    this._id = _id;
    this.title = title;
    this.body = body;
    this.tags = tags;
  }

  validate(): void {
    const validator = z.object({
      _id: z.string().min(1, 'Note ID is required'),
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

export default UpdateNoteDto;

