import { Injectable } from '@nestjs/common';
import { CreateAssetComponentDto } from './dto/create-asset_component.dto';
import { UpdateAssetComponentDto } from './dto/update-asset_component.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetComponent } from './entities/asset_component.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Injectable()
export class AssetComponentsService {
  constructor(
    @InjectRepository(AssetComponent)
    private readonly assetComponentRepo: Repository<AssetComponent>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,
    
  ) {}
  async create(createAssetComponentDto: CreateAssetComponentDto,req) {
    try {
      const userId = req.user.id;
      createAssetComponentDto.createdBy = userId;
      const { id } = createAssetComponentDto;
      let activity = id ? "Update asset component" : "Create new asset component";
        const Responsemsg = createAssetComponentDto.id ? 'Asset Components Updated Successfully.' : 'Asset Components Created Successfully.';
        const savedAssetComponents = [];
        // Iterate over each component_id and save it with the same asset_detail_id
        createAssetComponentDto.component_ids.forEach(async (componentId) => {
            const assetComponent = new AssetComponent();
            assetComponent.component_id = componentId;
            assetComponent.asset_detail_id = createAssetComponentDto.asset_detail_id;
            const savedAssetComponent = await this.assetComponentRepo.save(assetComponent);
          savedAssetComponents.push(savedAssetComponent);
          if (savedAssetComponent) {
            await this.activityRepository.save({ activity, user_id: userId, type: "asset-components" });
          }
        });
        return WriteResponse(200, savedAssetComponents, Responsemsg);
    } catch (err) {
        console.log(err);
        return WriteResponse(500, false, 'Something went Wrong.');
    }
}


  //GetAll
  async findAll() {
    try{
    const assetComponent = await this.assetComponentRepo.find({
      where: { is_deleted: false },
    });
    if (assetComponent.length>0) {
      return WriteResponse(200,assetComponent,'Asset Component Found Successfully.');
    }
    else{
      return WriteResponse(404, false, 'Asset Component Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const assetComponent = await this.assetComponentRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (assetComponent) {
      return WriteResponse(200,assetComponent,'Asset Component Found Successfully.');
    }
    else{
      return WriteResponse(404, false, 'Asset Component Not Found.');
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
      let activity = "Delete asset components" ;
    const deletedAssetComponent = await this.assetComponentRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedAssetComponent) {
      return WriteResponse(403, false, 'Asset Component Not found.');
    }
    else{
      await this.assetComponentRepo.update(id, { is_deleted: true });
      await this.activityRepository.save({ activity, user_id: userId, type: "asset-components" });
    return WriteResponse(200, true, 'Asset Component Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }

  
}
