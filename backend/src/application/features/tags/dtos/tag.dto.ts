import { z } from "zod";
import Dto from "../../../common/dto";
import { TagEntity } from "../../../../domain/entities";
import { Types } from "mongoose";

class TagDto implements Dto {
  _id: Types.ObjectId;
  name: string;

  constructor(id: Types.ObjectId, name: string) {
    this.name = name;
    this._id = id;
  }

  validate(): void {
    const validator = z.object({
      name: z
        .string()
        .min(1, "Name is required")
        .regex(/^[A-Za-z]+$/, "Name must contain only alphabetic characters"),
    });

    const validationResult = validator.safeParse(this);

    if (validationResult.success === false) {
      throw new Error(validationResult.error.errors[0].message);
    }
  }

  static fromEntity(tag: TagEntity): TagDto {
    return new TagDto(tag._id, tag.name);
  }
}

export default TagDto;
