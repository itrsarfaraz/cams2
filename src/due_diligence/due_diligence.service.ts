import { Injectable } from '@nestjs/common';
import { CreateDueDiligenceAnswersDto, CreateDueDiligenceDto } from './dto/create-due_diligence.dto';
import { UpdateDueDiligenceDto } from './dto/update-due_diligence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DueDiligenceAnswers, DueDiligenceQuestion } from './entities/due_diligence.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class DueDiligenceService {
  constructor(
    @InjectRepository(DueDiligenceQuestion)
    private readonly dueDiligenceQuestionRepo: Repository<DueDiligenceQuestion>,
    @InjectRepository(DueDiligenceAnswers)
    private readonly dueDiligenceAnswersRepo: Repository<DueDiligenceAnswers>,
  ) { }
  async create(createDueDiligenceDtoQuestion: CreateDueDiligenceDto) {
    try {
      const existingQuestion = await this.dueDiligenceQuestionRepo.findOne({
        where: { question: createDueDiligenceDtoQuestion.question, is_deleted: false },
      });
  
      if (existingQuestion && existingQuestion.id !== createDueDiligenceDtoQuestion.id) {
        return WriteResponse(403, false, 'Due Diligence Question Already Exists.');
      }
  
      const Responsemsg = createDueDiligenceDtoQuestion.id ? 'Due Diligence Question Updated Successfully.' : 'Due Diligence Question Created Successfully.';
      const data = await this.dueDiligenceQuestionRepo.save(createDueDiligenceDtoQuestion);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }
  async findAll() {
    try{
      const dueDiligenceDtoQuestion = await this.dueDiligenceQuestionRepo.find({
        where: { is_deleted: false },
        relations:['organization'],
      });
  
      if (dueDiligenceDtoQuestion.length>0) {
        return WriteResponse(200,dueDiligenceDtoQuestion,'Due Diligence Question Found Successfully.');
      }
      else{
        return WriteResponse(404, false, 'Due Diligence Question Not Found.');
      }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');      
    }
  }

  async findOne(id: string) {
    try{
      const dueDiligenceDtoQuestion = await this.dueDiligenceQuestionRepo.findOne({
        where: { id: id, is_deleted: false },
        relations:['organization'],

      });
  
      if (dueDiligenceDtoQuestion) {
        return WriteResponse(200,dueDiligenceDtoQuestion,'Due Diligence Question Found Successfully.');
      }
      else{
        return WriteResponse(404, false, 'Due Diligence Question Not Found.');
      }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

  async remove(id: string) {
    try{
      const deletedConstructionType = await this.dueDiligenceQuestionRepo.findOne({
        where: { id:id, is_deleted: false },
      });
      if (!deletedConstructionType) {
        return WriteResponse(404, false, 'Due Diligence Question Not found.');
      }
      else{
      await this.dueDiligenceQuestionRepo.update(id, { is_deleted: true });
      return WriteResponse(200, true, 'Due Diligence Question Deleted Successfully.');
      }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }
  async createAns(createDueDiligenceDtoAnswer: CreateDueDiligenceAnswersDto) {
    try {
      const Responsemsg = createDueDiligenceDtoAnswer.id ? 'Due Diligence Answer Updated Successfully.' : 'Due Diligence Answer Created Successfully.';
      const data = await this.dueDiligenceAnswersRepo.save(createDueDiligenceDtoAnswer);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }
  async findAllAns() {
    try{
      const dueDiligenceDtoAnswer = await this.dueDiligenceAnswersRepo.find({
        where: { is_deleted: false },
        relations:['dueDiligenceQuestion','businessCaseDetail'],
      });
  
      if (dueDiligenceDtoAnswer.length>0) {
        return WriteResponse(200,dueDiligenceDtoAnswer,'Due Diligence Answer Found Successfully.');
      }
      else{
        return WriteResponse(404, false, 'Due Diligence Answer Not Found.');
      }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

  async findOneAns(id: string) {
    try{
      const dueDiligenceDtoAnswer = await this.dueDiligenceAnswersRepo.findOne({
        where: { id: id, is_deleted: false },
        relations:['dueDiligenceQuestion','businessCaseDetail'],
      });
  
      if (dueDiligenceDtoAnswer) {
        return WriteResponse(200,dueDiligenceDtoAnswer,'Due Diligence Answer Found Successfully.');
      }
      else{
        return WriteResponse(404, false, 'Due Diligence Answer Not Found.');
      }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }
  async removeAns(id: string) {
    try{
      const dueDiligenceDtoAnswer = await this.dueDiligenceAnswersRepo.findOne({
        where: { id:id, is_deleted: false },
      });
      if (!dueDiligenceDtoAnswer) {
        return WriteResponse(404, false, 'Due Diligence Answer Not found.');
      }
      else{
      await this.dueDiligenceAnswersRepo.update(id, { is_deleted: true });
      return WriteResponse(200, true, 'Due Diligence Answer Deleted Successfully.');
      }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

}