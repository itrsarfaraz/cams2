import { Injectable } from '@nestjs/common';
import { CreateAssetTypeDto } from './dto/create-asset_type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetType } from './entities/asset_type.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class AssetTypesService {
  constructor(
    @InjectRepository(AssetType)
    private readonly assetTypeRepo: Repository<AssetType>,
    
  ) {}
  async create(createAssetTypeDto: CreateAssetTypeDto) {
    try {
      const existingCreateAssetType = await this.assetTypeRepo.findOne({
        where: { name: createAssetTypeDto.name, is_deleted: false },
      });
  
      if (existingCreateAssetType && existingCreateAssetType.id !== createAssetTypeDto.id) {
        return WriteResponse(403, false, 'Asset Type Already Exists.');
      }
  
      const Responsemsg = createAssetTypeDto.id ? 'Asset Type Updated Successfully.' : 'Asset Owner Department Created Successfully.';
      const data = await this.assetTypeRepo.save(createAssetTypeDto);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }



  //GetAll
  async findAll() {
    try{
    const assetTypes = await this.assetTypeRepo.find({
      where: { is_deleted: false },
    });

    if (assetTypes.length>0) {
      return WriteResponse(
        200,
        assetTypes,
        'Asset Types Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Asset Types Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const assetType = await this.assetTypeRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (assetType) {
      return WriteResponse(
        200,
        assetType,
        'Asset Type Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Asset Type Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

   //Delete
   async remove(id: string) {
    try{
    const deletedAssetType = await this.assetTypeRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedAssetType) {
      return WriteResponse(403, false, 'Asset Type Not found.');
    }
    else{
    await this.assetTypeRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Asset Type Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
