import { Injectable } from '@nestjs/common';
import { CreateComponentCostDto } from './dto/create-component_cost.dto';
import { UpdateComponentCostDto } from './dto/update-component_cost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentCost } from './entities/component_cost.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Injectable()
export class ComponentCostsService {
  constructor(
    @InjectRepository(ComponentCost)
    private readonly componentCostRepo: Repository<ComponentCost>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,
  ) {}
  async create(createComponentCostDto: CreateComponentCostDto,req) {
    try {
      const userId = req.user.id;
      let activity = createComponentCostDto.id ? "Update Component Cost" : "Create New Component Cost";
      const Responsemsg = createComponentCostDto.id ? 'Component Costs Updated Successfully.' : 'Component Costs Created Successfully.';
      const data = await this.componentCostRepo.save(createComponentCostDto);
      if(data)
      {
       await this.activityRepository.save({ activity, user_id: userId, type: "component-costs" });
      }
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  //GetAll
  async findAll() {
    try{
    const componentCost = await this.componentCostRepo.find({
      where: { is_deleted: false },
    });

  
    

    if (componentCost.length>0) {
      return WriteResponse(
        200,
        componentCost,
        'Component Cost Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Component Cost Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const componentCost = await this.componentCostRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (componentCost) {
      return WriteResponse(
        200,
        componentCost,
        'Component Cost Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Component Cost Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

  
  //Delete
  async remove(id: string,req) {
    try{
    const userId = req.user.id;
    let activity = "Delete Component Cost";
    const deletedComponentCost = await this.componentCostRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedComponentCost) {
      return WriteResponse(403, false, 'Component Cost Not found.');
    }
    else{
    await this.componentCostRepo.update(id, { is_deleted: true });
    await this.activityRepository.save({ activity, user_id: userId, type: "component-costs" });
    return WriteResponse(200, true, 'Component Cost Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
