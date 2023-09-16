import { Request, Response } from "express";
import { JournalsRepository } from "../../persistence/repositories";
import JournalsApplication from "../../application/features/journals/journals.application";
import { CreateJournalDto, DeleteJournalDto, GetAllJournalsDto, GetJournalDto, UpdateJournalDto } from "../../application/features/journals/dtos";

class JournalsController {
  journalsApplication: JournalsApplication;

  constructor() {
    const journalsRepository = new JournalsRepository();
    this.journalsApplication = new JournalsApplication(journalsRepository);
  }

  create = async (req: Request, res: Response) => {
    const { title, body, userId } = req.body;
    const createJournalDto = new CreateJournalDto(userId, title, body);

    const response = await this.journalsApplication.create(createJournalDto);

    if (response.success) 
      res.status(201).send(response);
    else
      res.status(400).send(response);
  }

  getAll = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const getAllJournalsDto = new GetAllJournalsDto(userId);

    const response = await this.journalsApplication.getAll(getAllJournalsDto);
    if (response.success) 
      res.status(200).send(response);
    else
      res.status(400).send(response);
  }
  
  get = async (req: Request, res: Response) => {
    const { journalId } = req.params;
    const { userId } = req.body;
    const getJournalDto = new GetJournalDto(userId, journalId);

    const response = await this.journalsApplication.get(getJournalDto);
    if (response.success) res.status(200).send(response);
    else res.status(400).send(response);
  }
  
  update = async (req: Request, res: Response) => {
    const { journalId } = req.params;
    const { userId, title, body } = req.body;
    const updateJournalDto = new UpdateJournalDto(userId, journalId, title, body);

    const response = await this.journalsApplication.update(updateJournalDto);
    if (response.success)
      res.status(204).send(response);
    else
      res.status(400).send(response);
  }

  delete = async (req: Request, res: Response) => {
    const { journalId } = req.params;
    const { userId } = req.body;
    const deleteJournalDto = new DeleteJournalDto(userId, journalId);

    const response = await this.journalsApplication.delete(deleteJournalDto);
    if (response.success)
      res.status(204).send(response);
    else
      res.status(400).send(response);
  } 
}

export default JournalsController;
