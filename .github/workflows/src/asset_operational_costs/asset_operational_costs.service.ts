import { Injectable } from '@nestjs/common';
import { CreateAssetOperationalCostDto } from './dto/create-asset_operational_cost.dto';
import { UpdateAssetOperationalCostDto } from './dto/update-asset_operational_cost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetOperationalCost } from './entities/asset_operational_cost.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Injectable()
export class AssetOperationalCostsService {
  constructor(
    @InjectRepository(AssetOperationalCost)
    private readonly assetOperationalCostRepo: Repository<AssetOperationalCost>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,
    
  ) {}
  async create(createAssetOperationalCostDto: CreateAssetOperationalCostDto,req) {
    try {
      const userId = req.user.id;
      createAssetOperationalCostDto.createdBy = userId;
      const { id } = createAssetOperationalCostDto;
      let activity = id ? "Update asset" : "Create new asset";
      const Responsemsg = createAssetOperationalCostDto.id ? 'Asset Operational Cost Updated Successfully.' : 'Asset Operational Cost Created Successfully.';
      const data = await this.assetOperationalCostRepo.save(createAssetOperationalCostDto);
      if (data) {
        await this.activityRepository.save({ activity, user_id: userId, type: "asset-detail" });
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
    const assetOperationalCost = await this.assetOperationalCostRepo.find({
      where: { is_deleted: false },
    });
    if (assetOperationalCost.length>0) {
      return WriteResponse(
        200,
        assetOperationalCost,
        'Asset Operational Cost Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Asset Operational Cost Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const assetOperationalCost = await this.assetOperationalCostRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (assetOperationalCost) {
      return WriteResponse(
        200,
        assetOperationalCost,
        'Asset Operational Cost Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Asset Operational Cost Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

  //Delete
  async remove(id: string,req) {
    try {
      const userId = req.user.id;
      let activity = "Extent asset review date" ;
    const deletedAssetOperationalCost = await this.assetOperationalCostRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedAssetOperationalCost) {
      return WriteResponse(403, false, 'Asset Operational Cost Not found.');
    }
    else{
      await this.assetOperationalCostRepo.update(id, { is_deleted: true });
      await this.activityRepository.save({ activity, user_id: userId, type: "asset-operational-costs" });
    return WriteResponse(200, true, 'Asset Operational Cost Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
