import TagEntity from "./tag.entity";
import BaseEntity from "../common/base.entity";

class NoteEntity extends BaseEntity {
  title: string;
  body: string;
  tags: TagEntity[];

  constructor(note: Partial<NoteEntity>) {
    super();
    Object.assign(this, note);
  }
}

export default NoteEntity;
