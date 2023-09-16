import BaseEntity from "../common/base.entity";

class JournalEntity extends BaseEntity {
  title: string;
  body: string;

  constructor(journal: Partial<JournalEntity>) {
    super();
    Object.assign(this, journal);
  }
}

export default JournalEntity;
