import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentFailureData } from './entities/component_failure_data.entity';
import { Repository } from 'typeorm';
import { CreateComponentFailureDataDto } from './dto/create-component_failure_data.dto';
import { WriteResponse } from 'src/shared/response';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';


@Injectable()
export class ComponentFailureDataService {
  constructor(
    @InjectRepository(ComponentFailureData)
    private readonly componentFailureDataRepo: Repository<ComponentFailureData>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,

  ) { }
  async create(createComponentFailureDataDto: CreateComponentFailureDataDto,req) {
    try {
      const userId = req.user.id;
      let activity = createComponentFailureDataDto.id ? "Update Component Failure Data" : "Create New Component Failure Data";
      const Responsemsg = createComponentFailureDataDto.id ? 'Component Failure Data Updated Successfully.' : 'Component Failure Data Created Successfully.';
      const data = await this.componentFailureDataRepo.save(createComponentFailureDataDto);
      if(data){
        await this.activityRepository.save({ activity, user_id: userId, type: "component-failure-data" });
      }
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  //GetAll
  async findAll() {
    try {
      const componentFailureData = await this.componentFailureDataRepo.find({
        where: { is_deleted: false },
      });
      if (componentFailureData.length > 0) {
        return WriteResponse(200,componentFailureData,'Component Failure Data Found Successfully.');
      }
      else {
        return WriteResponse(404, false, 'Component Failure Data Not Found.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');

    }
  }

  //Get One By Id
  async findOne(id: string) {
    try {
      const componentFailureData = await this.componentFailureDataRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (componentFailureData) {
        return WriteResponse(200,componentFailureData,'Component Failure Data Successfully.');
      }
      else {
        return WriteResponse(404, false, 'Component Failure Data Not Found.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');

    }
  }
  //Delete
  async remove(id: string,req) {
    try {
      const userId = req.user.id;
      let activity = "Delete Component Failure Data";
      const deletedComponentFailureData = await this.componentFailureDataRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!deletedComponentFailureData) {
        return WriteResponse(403, false, 'Component Failure Data Not found.');
      }
      else {
        await this.componentFailureDataRepo.update(id, { is_deleted: true });
        await this.activityRepository.save({ activity, user_id: userId, type: "component-failure-data" });
        return WriteResponse(200, true, 'Component Failure Data Deleted Successfully.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }
}
