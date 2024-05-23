import { Injectable } from '@nestjs/common';
import { CreateWlcCapitalCostDto } from './dto/create-wlc_capital_cost.dto';
import { UpdateWlcCapitalCostDto } from './dto/update-wlc_capital_cost.dto';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WlcCapitalCost } from './entities/wlc_capital_cost.entity';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class WlcCapitalCostsService {
  constructor(
    @InjectRepository(WlcCapitalCost)
    private readonly wlcCapitalCostRepository: Repository<WlcCapitalCost>,
    
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,

  ) { }
  async create(createWlcCapitalCostDto: CreateWlcCapitalCostDto,req) {
    try {
      const userId = req.user.id;
      const { id } = createWlcCapitalCostDto;
      let activity = id ? "Update whole life cycle capital cost" : "Create new whole life cycle capital cost";
      
      const Responsemsg = createWlcCapitalCostDto.id ? 'Whole life cycle capital cost updated successfully.' : 'Whole life cycle capital cost created successfully.';
      const data = await this.wlcCapitalCostRepository.save(createWlcCapitalCostDto);
      if (data) {
        await this.activityRepository.save({ activity, user_id: userId, type: "wlc-capital-costs" });
      }
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  async findAll() {
    try {
      const data=await this.wlcCapitalCostRepository.find({
        where:{is_deleted:false}
      })
      if(data.length>0){
        return WriteResponse(200,data,'Whole life cycle costs found successfully')
      }else{
        return WriteResponse(404,false,'Whole life cycle costs not found')
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500,false,'Something went wrong');
      
    }
  }

  async findOne(id: string) {
    try {
      const data=await this.wlcCapitalCostRepository.findOne({
        where:{id:id,is_deleted:false}
      })
      if(data){
        return WriteResponse(200,data,'Whole life cycle capital cost found successfully')
      }else{
        return WriteResponse(404,false,'Whole life cycle capital cost not found')
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500,false,'Something went wrong')
      
    }
  }

  //Delete
  async remove(id: string,req) {
    try {
      const userId = req.user.id;
      let activity = "Delete whole life cycle capital cost" ;
      const deletedWlcCapitalCost = await this.wlcCapitalCostRepository.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!deletedWlcCapitalCost) {
        return WriteResponse(403, false, 'Whole life cycle capital cost not found.');
      }
      else {
        await this.wlcCapitalCostRepository.update(id, { is_deleted: true });
        await this.activityRepository.save({ activity, user_id: userId, type: "wlc-capital-costs" });
        return WriteResponse(200, true, 'Whole life cycle capital cost deleted successfully.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went wrong.');
    }
  }
}
