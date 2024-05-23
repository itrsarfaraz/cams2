import { Injectable } from '@nestjs/common';
import { CreateOrganisationAssumptionFieldTypeDto } from './dto/create-organisation_assumption_field_type.dto';
import { UpdateOrganisationAssumptionFieldTypeDto } from './dto/update-organisation_assumption_field_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganisationAssumptionFieldType } from './entities/organisation_assumption_field_type.entity';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class OrganisationAssumptionFieldTypesService {
  constructor(
    @InjectRepository(OrganisationAssumptionFieldType)
    private readonly OrganisationAssumptionFieldTypeRepo: Repository<OrganisationAssumptionFieldType>,
  ) { }
  async create(createOrganisationAssumptionFieldTypeDto: CreateOrganisationAssumptionFieldTypeDto) {
    try {
      // Check if the field_name already exists
      const getBusinessCaseName = await this.findOne('field_name', createOrganisationAssumptionFieldTypeDto.field_name);

      // If a record with the same field_name exists and it's not the same record being updated
      if (getBusinessCaseName.data && getBusinessCaseName.data.id !== createOrganisationAssumptionFieldTypeDto.id) {
        return WriteResponse(403, false, 'Data Already Exist.');
      }

      // Save the new business case detail
      const data = await this.OrganisationAssumptionFieldTypeRepo.save(createOrganisationAssumptionFieldTypeDto);

      return WriteResponse(200, data, 'Organisation assumption field Created Successfully.');
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something Went Wrong.');
    }
  }

  async findAll() {
    try {
      const data=await this.OrganisationAssumptionFieldTypeRepo.find({
        where:{is_deleted:false}
      })

      if(data.length>0){
        return WriteResponse(200,data,'Records Found Successfully')
      }
      return WriteResponse(404,false,'Record Not Found')
    } catch (error) {
      console.log(error);
      return WriteResponse(500,false,'Something Went Wrong')
    }
  }

  async findOne(field: string = 'id', identifier: string) {
    var whereCondition = { is_deleted: false, [field]: identifier };
    const User = await this.OrganisationAssumptionFieldTypeRepo.findOne({ where: whereCondition });
    if (!User) {
      return WriteResponse(404, false, 'User Not Found.');
    }
    return WriteResponse(200, User, 'User Found Successfully.');
  }
  remove(id: number) {
    return `This action removes a #${id} organisationAssumptionFieldType`;
  }
}
