import { Injectable } from '@nestjs/common';
import { CreateBusinessCaseOutcomeDto } from './dto/create-business_case_outcome.dto';
import { UpdateBusinessCaseOutcomeDto } from './dto/update-business_case_outcome.dto';
import { WriteResponse } from 'src/shared/response';
import { BusinessCaseOutcome } from './entities/business_case_outcome.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessCaseOutcomeService {
  constructor(
    @InjectRepository(BusinessCaseOutcome)
    private readonly businessCaseOutcomeRepo: Repository<BusinessCaseOutcome>,
  ) { }
  
  async create(createBusinessCaseOutcomeDto: CreateBusinessCaseOutcomeDto) {
    try {
      const data = await this.businessCaseOutcomeRepo.save(createBusinessCaseOutcomeDto);

      return WriteResponse(200, data, 'Business Case Outcome Created Successfully.');
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something Went Wrong.');
    }
  }


  async findAll() {
    try{
    const businessCaseOutcome = await this.businessCaseOutcomeRepo.find({
      where: { is_deleted: false },
    });

    if (businessCaseOutcome.length>0) {
      return WriteResponse(
        200,
        businessCaseOutcome,
        'Business Case Outcome Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Business Case Outcome Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  async findOne(field: string = 'id', identifier: string) {
    var whereCondition = { is_deleted: false, [field]: identifier };
    const businessCaseOutcome = await this.businessCaseOutcomeRepo.findOne({ where: whereCondition });
    if (!businessCaseOutcome) {
      return WriteResponse(404, false, 'Business Case Outcome Not Found.');
    }
    return WriteResponse(200, businessCaseOutcome, 'Business Case Outcome Found Successfully.');
  }

  

  //Delete
  async remove(id: string) {
    try{
    const deletedBusinessCaseOutcome = await this.businessCaseOutcomeRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedBusinessCaseOutcome) {
      return WriteResponse(403, false, 'Business Case Outcome Not found.');
    }
    else{
    await this.businessCaseOutcomeRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Business Case Outcome Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
