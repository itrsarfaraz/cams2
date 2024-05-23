import { Injectable } from '@nestjs/common';
import { CreateAssetFinanceDto,CreateGetAssetOperationalCost } from './dto/create-asset_finance.dto';
import { UpdateAssetFinanceDto } from './dto/update-asset_finance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetFinance } from './entities/asset_finance.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';
import { AssetComponent } from 'src/asset_components/entities/asset_component.entity';
import { ComponentOutput } from 'src/component_outputs/entities/component_output.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';


@Injectable()
export class AssetFinanceService {
  constructor(
    @InjectRepository(AssetFinance)
    private readonly assetFinanceRepo: Repository<AssetFinance>,
    @InjectRepository(AssetComponent)
    private readonly assetComponentRepo: Repository<AssetComponent>,
    @InjectRepository(ComponentOutput)
    private readonly componentOutputRepo: Repository<ComponentOutput>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,

    
  ) {}
  async create(createAssetFinanceDto: CreateAssetFinanceDto,req) {
    try {
      const userId = req.user.id;
      createAssetFinanceDto.createdBy = userId;
      const { id } = createAssetFinanceDto;
      let activity = id ? "Update asset finance" : "Create new asset finance";
      const Responsemsg = createAssetFinanceDto.id ? 'Asset Finance Updated Successfully.' : 'Asset Finance Created Successfully.';
      const data = await this.assetFinanceRepo.save(createAssetFinanceDto);
      if (data) {
        await this.activityRepository.save({ activity, user_id: userId, type: "asset-finance" });
      }
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  async getAssetOperationalCosts(createGetAssetOperationalCost:CreateGetAssetOperationalCost){
    try {
     const assetComponents=await this.assetComponentRepo.find({
        where:{asset_detail_id:createGetAssetOperationalCost.asset_id}
      })
      
      var data={
        planned_maintenance:0,
        responsive_maintenance:0,
        total_operational_cost:0
      }

      if(!createGetAssetOperationalCost.asset_id){
        return WriteResponse(200,data,'Asset Operational Costs Not Found')
      }
      
      for (const ac of assetComponents) {
        const componentOutputs = await this.componentOutputRepo.find({
            where: { component_id: ac.component_id }
        });
        
        for (const componentOutput of componentOutputs) {
            data.planned_maintenance+=componentOutput.planned_repairs_cost_per_year;
            data.responsive_maintenance+=componentOutput.response_repairs_cost_per_year;
            data.total_operational_cost=data.planned_maintenance+data.responsive_maintenance;
        }
    }
    
    return WriteResponse(200,data,'Asset Operational Costs Found Successfully')
    
} catch (error) {
      console.log(error);
      return WriteResponse(500, false, "Something Went Wrong.");
     }
  }


  //GetAll
  async findAll() {
    try{
    const assetFinance = await this.assetFinanceRepo.find({
      where: { is_deleted: false },
    });
    if (assetFinance.length>0) {
      return WriteResponse(
        200,
        assetFinance,
        'Asset Finance Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Asset Finance Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const assetFinance = await this.assetFinanceRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (assetFinance) {
      return WriteResponse(
        200,
        assetFinance,
        'Asset Finance Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Asset Finance Not Found.');
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
      let activity = "Delete asset";
    const deletedAssetFinance = await this.assetFinanceRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedAssetFinance) {
      return WriteResponse(403, false, 'Asset Finance Not found.');
    }
    else{
      await this.assetFinanceRepo.update(id, { is_deleted: true });
      await this.activityRepository.save({ activity, user_id: userId, type: "asset-finance" });
    return WriteResponse(200, true, 'Asset Finance Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
