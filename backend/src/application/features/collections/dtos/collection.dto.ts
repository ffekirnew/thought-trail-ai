import { CollectionEntity } from "../../../../domain/entities";
import { NoteDto } from "../../notes/dtos";

class CollectionDto {
  _id: string;
  slug: string;
  name: string;
  description: string;
  notes: NoteDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    slug: string,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    notes: NoteDto[],
  ) {
    this._id = id;
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.notes = notes;
  }

  static fromEntity(collection: CollectionEntity) {
    return new CollectionDto(
      collection._id.toString(),
      collection.slug,
      collection.name,
      collection.description,
      collection.createdAt,
      collection.updatedAt,
      collection.notes.map((note) => NoteDto.fromEntity(note)),
    );
  }
}

export default CollectionDto;
