import BaseEntity from "../common/base.entity";

class TagEntity extends BaseEntity {
  name: string;

  constructor(tag: Partial<TagEntity>) {
    super();
    Object.assign(this, tag);
  }
}

export default TagEntity;
