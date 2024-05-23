import { Injectable } from '@nestjs/common';
import { CreateBusinessCaseIntendTenureDto } from './dto/create-business_case_intend_tenure.dto';
import { UpdateBusinessCaseIntendTenureDto } from './dto/update-business_case_intend_tenure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessCaseIntendTenure } from './entities/business_case_intend_tenure.entity';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class BusinessCaseIntendTenureService {
  constructor(
    @InjectRepository(BusinessCaseIntendTenure)
    private readonly businessCaseIntendTenureRepo: Repository<BusinessCaseIntendTenure>,
    
  ) {}
  
  async create(createBusinessCaseIntendTenureDto: CreateBusinessCaseIntendTenureDto) {
    try {
      const existingBusinessCaseIntendTenure = await this.businessCaseIntendTenureRepo.findOne({
        where: { name: createBusinessCaseIntendTenureDto.name, is_deleted: false },
      });
  
      if (existingBusinessCaseIntendTenure && existingBusinessCaseIntendTenure.id !== createBusinessCaseIntendTenureDto.id) {
        return WriteResponse(403, false, 'Business Case Intend Tenure Already Exists.');
      }
  
      const Responsemsg = createBusinessCaseIntendTenureDto.id ? 'Business Case Intend Tenure Updated Successfully.' : 'Business Case Intend Tenure Created Successfully.';
      const data = await this.businessCaseIntendTenureRepo.save(createBusinessCaseIntendTenureDto);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  

  //GetAll
  async findAll() {
    try{
    const businessCaseIntendTenures = await this.businessCaseIntendTenureRepo.find({
      where: { is_deleted: false },
    });

    if (businessCaseIntendTenures.length>0) {
      return WriteResponse(
        200,
        businessCaseIntendTenures,
        'Business Case Intend Tenures Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Business Case Intend Tenures Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const businessCaseIntendTenure = await this.businessCaseIntendTenureRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (businessCaseIntendTenure) {
      return WriteResponse(
        200,
        businessCaseIntendTenure,
        'Business Case Intend Tenure Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Business Case Intend Tenure Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  //Delete
  async remove(id: string) {
    try{
    const deletedBusinessCaseIntendTenure = await this.businessCaseIntendTenureRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedBusinessCaseIntendTenure) {
      return WriteResponse(403, false, 'Business Case Intend Tenure Not found.');
    }
    else{
    await this.businessCaseIntendTenureRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Business Case Intend Tenure Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
