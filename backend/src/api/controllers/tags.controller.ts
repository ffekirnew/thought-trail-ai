import { Request, Response } from "express";
import TagsApplication from "../../application/features/tags/tags.application";
import { TagsRepository } from "../../persistence/repositories";
import { CreateTagDto, DeleteTagDto, GetAllTagsDto, GetTagDto, UpdateTagDto } from "../../application/features/tags/dtos";
import { Types } from "mongoose";

class TagsController {
  tagsApplication: TagsApplication;

  constructor() {
    const tagsRepository = new TagsRepository();
    this.tagsApplication = new TagsApplication(tagsRepository);
  }

  create = async (req: Request, res: Response) => {
    const { name, userId } = req.body;
    const createTagDto = new CreateTagDto(name, userId);

    const response = await this.tagsApplication.create(createTagDto);

    if (response.success)
      res.status(201).json(response);
    else
      res.status(400).json(response);
  }

  getAll = async (req: Request, res: Response) => {
    const { userId } = req.body;

    const getAllTagsDto = new GetAllTagsDto(userId);
    const response = await this.tagsApplication.getAll(getAllTagsDto);

    if (response.success) res.status(200).json(response);
    else res.status(400).json(response);
  }

  get = async (req: Request, res: Response) => {
    const { tagId } = req.params;
    const { userId } = req.body;

    const getTagDto = new GetTagDto(userId, new Types.ObjectId(tagId));
    const response = await this.tagsApplication.get(getTagDto);

    if (response.success) res.status(200).json(response);
    else res.status(400).json(response);
  }

  update = async (req: Request, res: Response) => {
    const { tagId } = req.params;
    const { userId, name } = req.body;

    const updateTagDto = new UpdateTagDto(name, userId, new Types.ObjectId(tagId));
    const response = await this.tagsApplication.update(updateTagDto);

    if (response.success) res.status(204).json(response);
    else res.status(400).json(response);
  }

  delete = async (req: Request, res: Response) => {
    const { tagId } = req.params;
    const { userId } = req.body;

    const deleteTagDto = new DeleteTagDto(userId, new Types.ObjectId(tagId));
    const response = await this.tagsApplication.delete(deleteTagDto);

    if (response.success) res.status(204).json(response);
    else res.status(400).json(response);
  } 
}

export default TagsController;
