import { Injectable } from '@nestjs/common';
import { CreateBusinessCasePurposeDto } from './dto/create-business_case_purpose.dto';
import { UpdateBusinessCasePurposeDto } from './dto/update-business_case_purpose.dto';
import { WriteResponse } from 'src/shared/response';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessCasePurpose } from './entities/business_case_purpose.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessCasePurposeService {
  constructor(
    @InjectRepository(BusinessCasePurpose)
    private readonly businessCasePurposeRepo: Repository<BusinessCasePurpose>,
    
  ) {}
  async create(createBusinessCasePurposeDto: CreateBusinessCasePurposeDto) {
    try {
      const existingBusinessCasePurpose = await this.businessCasePurposeRepo.findOne({
        where: { name: createBusinessCasePurposeDto.name, is_deleted: false },
      });
  
      if (existingBusinessCasePurpose && existingBusinessCasePurpose.id !== createBusinessCasePurposeDto.id) {
        return WriteResponse(403, false, 'Business Case Purpose Already Exists.');
      }
  
      const Responsemsg = createBusinessCasePurposeDto.id ? 'Business Case Purpose Updated Successfully.' : 'Business Case Purpose Created Successfully.';
      const data = await this.businessCasePurposeRepo.save(createBusinessCasePurposeDto);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  

  //GetAll
  async findAll() {
    try{
    const businessCasePurposes = await this.businessCasePurposeRepo.find({
      where: { is_deleted: false },
    });

    if (businessCasePurposes.length>0) {
      return WriteResponse(
        200,
        businessCasePurposes,
        'Business Case Purposes Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Business Case Purposes Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const businessCasePurpose = await this.businessCasePurposeRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (businessCasePurpose) {
      return WriteResponse(
        200,
        businessCasePurpose,
        'Business Case Purpose Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Business Case Purpose Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

   //Delete
   async remove(id: string) {
    try{
    const deletedBusinessCasePurpose = await this.businessCasePurposeRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedBusinessCasePurpose) {
      return WriteResponse(403, false, 'Business Case Purpose Not found.');
    }
    else{
    await this.businessCasePurposeRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Business Case Purpose Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
