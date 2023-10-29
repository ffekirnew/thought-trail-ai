import { JournalEntity } from "../../../domain/entities";
import { IJournalsRepository } from "../../contracts/persistence";
import { BaseResponse } from "../../responses";
import {
  CreateJournalDto,
  UpdateJournalDto,
  DeleteJournalDto,
  GetAllJournalsDto,
  GetJournalDto,
  JournalDto,
} from "./dtos";
import { Types } from "mongoose";

class JournalsApplication {
  constructor(private readonly journalsRepository: IJournalsRepository) {}

  create = async (
    createJournalDto: CreateJournalDto,
  ): Promise<BaseResponse<Types.ObjectId>> => {
    try {
      createJournalDto.validate();
      const newJournal = new JournalEntity({
        title: createJournalDto.title,
        body: createJournalDto.body,
      });

      const id = await this.journalsRepository.createJournal(
        new Types.ObjectId(createJournalDto.userId),
        newJournal,
      );
      return BaseResponse.success<Types.ObjectId>(
        "Journal created successfully.",
        id,
      );
    } catch (error) {
      return BaseResponse.error<Types.ObjectId>(
        "Journal creation failed.",
        error.message,
      );
    }
  };

  update = async (
    updateJournalDto: UpdateJournalDto,
  ): Promise<BaseResponse<void>> => {
    try {
      updateJournalDto.validate();
      const newJournal = new JournalEntity({
        title: updateJournalDto.title,
        body: updateJournalDto.body,
      });

      await this.journalsRepository.updateJournal(
        new Types.ObjectId(updateJournalDto.userId),
        new Types.ObjectId(updateJournalDto.journalId),
        newJournal,
      );
      return BaseResponse.success<void>("Journal updation successfully.", null);
    } catch (error) {
      return BaseResponse.error<void>(
        "Journal updation failed.",
        error.message,
      );
    }
  };

  delete = async (
    deleteJournalDto: DeleteJournalDto,
  ): Promise<BaseResponse<void>> => {
    try {
      deleteJournalDto.validate();
      await this.journalsRepository.deleteJournal(
        new Types.ObjectId(deleteJournalDto.userId),
        new Types.ObjectId(deleteJournalDto.journalId),
      );
      return BaseResponse.success<void>("Journal deleted successfully.", null);
    } catch (error) {
      return BaseResponse.error<void>(
        "Journal deletion failed.",
        error.message,
      );
    }
  };

  getAll = async (
    getAllJournalsDto: GetAllJournalsDto,
    orderBy: string,
    ordering: string,
  ): Promise<BaseResponse<JournalDto[]>> => {
    try {
      getAllJournalsDto.validate();
      const journals = await this.journalsRepository.getAllJournals(
        new Types.ObjectId(getAllJournalsDto.userId),
        orderBy,
        ordering,
      );

      return BaseResponse.success<JournalDto[]>(
        "Journals retrieved successfully.",
        journals.map((journal) => JournalDto.fromEntity(journal)),
      );
    } catch (error) {
      return BaseResponse.error<JournalDto[]>(
        "Journals could not be retrieved.",
        error.message,
      );
    }
  };

  get = async (
    getJournalDto: GetJournalDto,
  ): Promise<BaseResponse<JournalDto>> => {
    try {
      getJournalDto.validate();
      const journal = await this.journalsRepository.getJournal(
        new Types.ObjectId(getJournalDto.userId),
        new Types.ObjectId(getJournalDto.journalId),
      );
      return BaseResponse.success<JournalDto>(
        "Journal retrieved successfully.",
        JournalDto.fromEntity(journal),
      );
    } catch (error) {
      return BaseResponse.error<JournalDto>(
        "Journal could not be retrieved.",
        error.message,
      );
    }
  };
}

export default JournalsApplication;
