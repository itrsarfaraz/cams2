import { Injectable } from '@nestjs/common';
import { CreateAssumptionDto } from './dto/create-assumption.dto';
import { UpdateAssumptionDto } from './dto/update-assumption.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Assumption } from './entities/assumption.entity';
import { WriteResponse } from 'src/shared/response';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';
@Injectable()
export class AssumptionsService {
  constructor(
    @InjectRepository(Assumption)
    private readonly AssumptionRepo: Repository<Assumption>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,
  ) { }

async create(createAssumptionDto: CreateAssumptionDto[], req) {
  try {
    const userId = req.user.id;
    const activity = "Create New Assumption";
    const existingData = await this.AssumptionRepo.find({
      where: { is_deleted: false },
    });
    for (const newAssumption of createAssumptionDto) {
      let assumptionExists = false;
      for (const existingAssumption of existingData) {
        if (
          existingAssumption.field_type_id === newAssumption.field_type_id &&
          existingAssumption.organisation_id === newAssumption.organisation_id
        ) {
          await this.AssumptionRepo.update(existingAssumption.id, newAssumption);
          assumptionExists = true;
          break; 
        }
      }
      if (!assumptionExists) {
        await this.AssumptionRepo.save(newAssumption);
        await this.activityRepository.save({
          activity,
          user_id: userId,
          type: "assumptions",
        });
      }
    }
    return WriteResponse(200, createAssumptionDto, 'Assumptions Created Successfully');
  } catch (error) {
    console.log(error);
    return WriteResponse(500, false, 'Something Went Wrong.');
  }
}


async findAll() {
    try {
      const component = await this.AssumptionRepo.find({
        where: { is_deleted: false },
      });
      if (component.length > 0) {
        return WriteResponse(200, component, "Record Found Seccessfully.");
      }
      return WriteResponse(404, [], "Record Not Found");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async getOneByField(field: string = 'id', identifier: string) {
    var whereCondition = { is_deleted: false, [field]: identifier };
    const Assumptions = await this.AssumptionRepo.findOne({ where: whereCondition });
    if (!Assumptions) {
      return WriteResponse(404, false, 'Assumptions Not Found.');
    }
    return WriteResponse(200, Assumptions, 'Assumptions Found Successfully.');
  }

  async getAllByField(field: string = 'id', identifier: string) {
    var whereCondition = { is_deleted: false, [field]: identifier };
    const Assumptions = await this.AssumptionRepo.find({ where: whereCondition });
    if (!Assumptions) {
      return WriteResponse(404, false, 'Assumptions Not Found.');
    }
    return WriteResponse(200, Assumptions, 'Assumptions Found Successfully.');
  }

  update(id: number, updateAssumptionDto: UpdateAssumptionDto) {
    return `This action updates a #${id} assumption`;
  }

  remove(id: number) {
    return `This action removes a #${id} assumption`;
  }
}
