import BaseEntity from "../common/base.entity";
import NoteEntity from "./note.entity";

class CollectionEntity extends BaseEntity {
  slug: string;
  name: string;
  description: string;
  notes: NoteEntity[];

  constructor(collection: Partial<CollectionEntity>) {
    super();
    Object.assign(this, collection);
  }
}

export default CollectionEntity;
