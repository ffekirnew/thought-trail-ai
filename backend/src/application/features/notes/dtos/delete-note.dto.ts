import { Types } from "mongoose";
import Dto from "../../../common/dto";

class DeleteNoteDto extends Dto {
  _id: Types.ObjectId;

  validate(): void {
    throw new Error("Method not implemented.");
  }
}

export default DeleteNoteDto;
