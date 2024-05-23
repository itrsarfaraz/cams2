import { Injectable } from '@nestjs/common';
import { CreateAssetRiskDto } from './dto/create-asset_risk.dto';
import { UpdateAssetRiskDto } from './dto/update-asset_risk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetRisk } from './entities/asset_risk.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Injectable()
export class AssetRiskService {
  constructor(
    @InjectRepository(AssetRisk)
    private readonly assetRiskRepo: Repository<AssetRisk>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,

    
  ) {}
  async create(createAssetRiskDto: CreateAssetRiskDto,req) {
    try {
      const userId = req.user.id;
      createAssetRiskDto.createdBy = userId;
      const { id } = createAssetRiskDto;
      let activity = id ? "Update asset risk" : "Create new asset risk";
      const Responsemsg = createAssetRiskDto.id ? 'Asset Risk Updated Successfully.' : 'Asset Risk Created Successfully.';
      const data = await this.assetRiskRepo.save(createAssetRiskDto);
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
    const assetRisk = await this.assetRiskRepo.find({
      where: { is_deleted: false },
    });
    if (assetRisk.length>0) {
      return WriteResponse(200,assetRisk,'Asset Risk Found Successfully.');
    }
    else{
      return WriteResponse(404, false, 'Asset Risk Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const assetRisk = await this.assetRiskRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (assetRisk) {
      return WriteResponse(200,assetRisk,'Asset Risk Found Successfully.');
    }
    else{
      return WriteResponse(404, false, 'Asset Risk Not Found.');
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
      let activity = "Delete asset risk" ;
    const deletedAssetRisk = await this.assetRiskRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedAssetRisk) {
      return WriteResponse(403, false, 'Asset Risk Not found.');
    }
    else{
      await this.assetRiskRepo.update(id, { is_deleted: true });
      await this.activityRepository.save({ activity, user_id: userId, type: "asset-risk" });
    return WriteResponse(200, true, 'Asset Risk Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
