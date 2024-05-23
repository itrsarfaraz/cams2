import { Injectable } from '@nestjs/common';
import { BusinessCaseStatusDTO, CreateBusinessCaseDetailDto } from './dto/create-business_case_detail.dto';
import { UpdateBusinessCaseDetailDto } from './dto/update-business_case_detail.dto';
import { WriteResponse } from 'src/shared/response';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessCaseDetail } from './entities/business_case_detail.entity';

@Injectable()
export class BusinessCaseDetailService {
  constructor(
    @InjectRepository(BusinessCaseDetail)
    private readonly BusinessCaseDetailRepo: Repository<BusinessCaseDetail>,
  ) { }
  async create(createBusinessCaseDetailDto: CreateBusinessCaseDetailDto) {
    try {
      // Check if the acquisition_business_case_name already exists
      const getBusinessCaseName = await this.findOne('acquisition_business_case_name', createBusinessCaseDetailDto.acquisition_business_case_name);

      // If a record with the same acquisition_business_case_name exists and it's not the same record being updated
      if (getBusinessCaseName.data && getBusinessCaseName.data.id !== createBusinessCaseDetailDto.id) {
        return WriteResponse(403, false, 'Business Case Already Exist.');
      }

      // Save the new business case detail
      const data = await this.BusinessCaseDetailRepo.save(createBusinessCaseDetailDto);

      return WriteResponse(200, data, 'Business Case Created Successfully.');
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something Went Wrong.');
    }
  }

  async findAll() {
    try {
      const businessCases=await this.BusinessCaseDetailRepo.find({
        where:{is_deleted:false}
      })
      if(businessCases.length>0){
        return WriteResponse(200,businessCases,'Business Cases Found Successfully')
      }
      else{
        return WriteResponse(404,false,'Business Cases Not Found')
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500,false,'Something Went Wrong')
    }
  }

  async findOne(field: string = 'id', identifier: string) {
    var whereCondition = { is_deleted: false, [field]: identifier };
    const User = await this.BusinessCaseDetailRepo.findOne({ where: whereCondition });
    if (!User) {
      return WriteResponse(404, false, 'User Not Found.');
    }
    return WriteResponse(200, User, 'User Found Successfully.');
  }

  //Delete
  async remove(id: string) {
    try {
      const deletedBusinessCaseDetail = await this.BusinessCaseDetailRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!deletedBusinessCaseDetail) {
        return WriteResponse(403, false, 'Business Case Detail Not found.');
      }
      else {
        await this.BusinessCaseDetailRepo.update(id, { is_deleted: true });
        return WriteResponse(200, true, 'Business Case Detail Deleted Successfully.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  //Business Case Status
  async businessCaseStatus(businessCaseStatusDTO: BusinessCaseStatusDTO, req) {
    const businessCaseStatus = await this.BusinessCaseDetailRepo.find({
      where: {
        id: In(businessCaseStatusDTO.businessCaseDetails_ids),
        is_deleted: false,
      },
    });

    if (!businessCaseStatus) {
      return WriteResponse(400, false, "Record Not found.");
    }
    await this.BusinessCaseDetailRepo.update(
      businessCaseStatusDTO.businessCaseDetails_ids,
      {
        business_case_status: businessCaseStatusDTO.business_case_status,
      },
    );
    return WriteResponse(200, true, "Business Case Status Changed Successfully.");
  }

  //Duplicate
  async duplicate(createBusinessCaseDetailDto: CreateBusinessCaseDetailDto) {
    try {
      const data = await this.BusinessCaseDetailRepo.save(createBusinessCaseDetailDto);
      return WriteResponse(200, data, 'Business Case Duplicated Successfully.');
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something Went Wrong.');
    }
  }
}
