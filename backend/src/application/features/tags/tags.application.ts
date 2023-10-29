import { Types } from "mongoose";
import { TagsRepository } from "../../../persistence/repositories";
import { BaseResponse } from "../../responses";
import {
  CreateTagDto,
  DeleteTagDto,
  GetTagDto,
  TagDto,
  UpdateTagDto,
} from "./dtos";
import GetAllTagsDto from "./dtos/get-all-tags.dto";
import { TagEntity } from "../../../domain/entities";

class TagsApplication {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async create(
    createTagDto: CreateTagDto,
  ): Promise<BaseResponse<Types.ObjectId>> {
    try {
      createTagDto.validate();
      const id = await this.tagsRepository.createTag(
        createTagDto.userId,
        new TagEntity({ name: createTagDto.name }),
      );
      return BaseResponse.success<Types.ObjectId>(
        "Tag created successfully.",
        id,
      );
    } catch (error) {
      return BaseResponse.error<Types.ObjectId>(
        "Tag creation failed.",
        error.message,
      );
    }
  }

  async update(updateTagDto: UpdateTagDto): Promise<BaseResponse<void>> {
    try {
      updateTagDto.validate();
      const tag = new TagEntity({ name: updateTagDto.name });
      await this.tagsRepository.updateTag(
        updateTagDto.userId,
        updateTagDto.tagId,
        tag,
      );
      return BaseResponse.success<void>("Tag updation successfully.", null);
    } catch (error) {
      return BaseResponse.error<void>("Tag updation failed.", error.message);
    }
  }

  async delete(delteTagDto: DeleteTagDto): Promise<BaseResponse<void>> {
    try {
      delteTagDto.validate();
      await this.tagsRepository.deleteTag(
        delteTagDto.userId,
        delteTagDto.tagId,
      );
      return BaseResponse.success<void>("Tag deleted successfully.", null);
    } catch (error) {
      return BaseResponse.error<void>("Tag deletion failed.", error.message);
    }
  }

  async get(getTagDto: GetTagDto): Promise<BaseResponse<TagDto>> {
    try {
      getTagDto.validate();
      const tag = await this.tagsRepository.getTag(
        getTagDto.userId,
        getTagDto.tagId,
      );
      return BaseResponse.success<TagDto>(
        "Tag retrieved successfully.",
        TagDto.fromEntity(tag),
      );
    } catch (error) {
      return BaseResponse.error<TagDto>("Tag retrieval failed.", error.message);
    }
  }

  async getAll(getAllTagsDto: GetAllTagsDto): Promise<BaseResponse<TagDto[]>> {
    try {
      getAllTagsDto.validate();
      const tags = await this.tagsRepository.getAllTags(getAllTagsDto.userId);
      return BaseResponse.success<TagDto[]>(
        "Tag retrieval successfully.",
        tags.map((tag) => TagDto.fromEntity(tag)),
      );
    } catch (error) {
      return BaseResponse.error<TagDto[]>(
        "Tag retrieval failed.",
        error.message,
      );
    }
  }
}

export default TagsApplication;
