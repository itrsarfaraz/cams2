import { Injectable } from '@nestjs/common';
import { CreateAssetOwnerDepartmentDto } from './dto/create-asset_owner_department.dto';
import { UpdateAssetOwnerDepartmentDto } from './dto/update-asset_owner_department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetOwnerDepartment } from './entities/asset_owner_department.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class AssetOwnerDepartmentService {
  constructor(
    @InjectRepository(AssetOwnerDepartment)
    private readonly assetOwnerDepartmentRepo: Repository<AssetOwnerDepartment>,
    
  ) {}
  async create(createAssetOwnerDepartmentDto: CreateAssetOwnerDepartmentDto) {
    try {
      const existingAssetOwnerDepartment=await this.findOne('name',createAssetOwnerDepartmentDto.name)
      
      if (existingAssetOwnerDepartment.data && existingAssetOwnerDepartment.data.id!== createAssetOwnerDepartmentDto.id) {
        return WriteResponse(403, false, 'Asset Owner Department Already Exists.');
      }
  
      const Responsemsg = createAssetOwnerDepartmentDto.id ? 'Asset Owner Department Updated Successfully.' : 'Asset Owner Department Created Successfully.';
      const data = await this.assetOwnerDepartmentRepo.save(createAssetOwnerDepartmentDto);
      return WriteResponse(200, data, Responsemsg);
      
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }
  
  
  //GetAll
  async findAll() {
    try{
    const assetOwnerDepartments = await this.assetOwnerDepartmentRepo.find({
      where: { is_deleted: false },
    });

    if (assetOwnerDepartments.length>0) {
      return WriteResponse(
        200,
        assetOwnerDepartments,
        'Asset Owner Departments Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Asset Owner Departments Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }
  
  async findOne(field: string = 'id', identifier: string) {
    const whereCondition = { is_deleted: false, [field]: identifier };

    const assetOwnerDepartment = await this.assetOwnerDepartmentRepo.findOne({ where: whereCondition });
    if (!assetOwnerDepartment) {
      return WriteResponse(404, false, 'Asset Owner Department Not Found.');
    }
    return WriteResponse(200, assetOwnerDepartment, 'Asset Owner Department Found Successfully.');
  }

   //Delete
   async remove(id: string) {
    try{
    const deletedAssetOwnerDepartment = await this.assetOwnerDepartmentRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedAssetOwnerDepartment) {
      return WriteResponse(403, false, 'Asset Owner Department Not found.');
    }
    else{
    await this.assetOwnerDepartmentRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Asset Owner Department Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
