import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DecisionCriteria } from './entities/decision_criteria.entity';
import { Repository } from 'typeorm';
import { CreateDecisionCriteriaDto } from './dto/create-decision_criteria.dto';
import { WriteResponse } from 'src/shared/response';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';


@Injectable()
export class DecisionCriteriaService {
  constructor(
    @InjectRepository(DecisionCriteria)
    private readonly decisionCriteriaRepo: Repository<DecisionCriteria>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,
  ) { }

async create(createDecisionCriteriaDto: CreateDecisionCriteriaDto[], req) {
  try {
    const userId = req.user.id;
    const activity = "Create New Decision Criteria";
    const existingData = await this.decisionCriteriaRepo.find({
      where: { is_deleted: false },
    });
    for (const newDecisionCriteria of createDecisionCriteriaDto) {
      let decisionCriteriaExists = false;
      for (const existingDecisionCriteria of existingData) {
        if (
          existingDecisionCriteria.assumption_id === newDecisionCriteria.assumption_id &&
          existingDecisionCriteria.business_case_detail_id === newDecisionCriteria.business_case_detail_id
        ) {
          await this.decisionCriteriaRepo.update(existingDecisionCriteria.id, newDecisionCriteria);
          decisionCriteriaExists = true;
          break; 
        }
      }
      if (!decisionCriteriaExists) {
        await this.decisionCriteriaRepo.save(newDecisionCriteria);
        await this.activityRepository.save({
          activity,
          user_id: userId,
          type: "decision-criteria",
        });
      }
    }
    return WriteResponse(200, createDecisionCriteriaDto, 'Decision Criteria Created Successfully');
  } catch (error) {
    console.log(error);
    return WriteResponse(500, false, 'Something Went Wrong.');
  }
}

async findAll() {
    try{
    const decisionCriteria = await this.decisionCriteriaRepo.find({
      where: { is_deleted: false },
    });

    if (decisionCriteria.length>0) {
      return WriteResponse(200,decisionCriteria,'Decision Criteria Found Successfully.');
    }
    else{
      return WriteResponse(404, false, 'Decision Criteria Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  async findOne(field: string = 'id', identifier: string) {
    var whereCondition = { is_deleted: false, [field]: identifier };
    const decisionCriteria = await this.decisionCriteriaRepo.findOne({ where: whereCondition });
    if (!decisionCriteria) {
      return WriteResponse(404, false, 'Decision Criteria Not Found.');
    }
    return WriteResponse(200, decisionCriteria, 'Decision Criteria Found Successfully.');
  }

 

  //Delete
  async remove(id: string,req) {
    try{
    const userId = req.user.id;
    let activity = "Delete Decision Criteria";
    const deletedDecisionCriteria = await this.decisionCriteriaRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedDecisionCriteria) {
      return WriteResponse(403, false, 'Decision Criteria Not found.');
    }
    else{
    await this.decisionCriteriaRepo.update(id, { is_deleted: true });
    await this.activityRepository.save({ activity, user_id: userId, type: "decision-criteria" });
    return WriteResponse(200, true, 'Decision Criteria Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
