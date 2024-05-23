import { Injectable } from '@nestjs/common';
import { CreateBusinessCaseAssumptionDto } from './dto/create-business_case_assumption.dto';
import { UpdateBusinessCaseAssumptionDto } from './dto/update-business_case_assumption.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessCaseAssumption } from './entities/business_case_assumption.entity';
import { Repository } from 'typeorm';
import { WriteResponse, paginateResponse } from 'src/shared/response';
import { IPagination } from 'src/shared/paginationEum';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Injectable()
export class BusinessCaseAssumptionsService {
  constructor(
    @InjectRepository(BusinessCaseAssumption)
    private readonly businessCaseAssumptionRepo: Repository<BusinessCaseAssumption>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,
  ){}

async create(createBusinessCaseAssumptionDto: CreateBusinessCaseAssumptionDto[], req) {
  try {
    const userId = req.user.id;
    const activity = "Create New Business Case Assumption";
    const existingData = await this.businessCaseAssumptionRepo.find({
      where: { is_deleted: false },
    });
    for (const newBusinessCaseAssumption of createBusinessCaseAssumptionDto) {
      let businessCaseAssumptionExists = false;
      for (const existingBusinessCaseAssumption of existingData) {
        if (
          existingBusinessCaseAssumption.assumption_id === newBusinessCaseAssumption.assumption_id &&
          existingBusinessCaseAssumption.business_case_detail_id === newBusinessCaseAssumption.business_case_detail_id
        ) {
          await this.businessCaseAssumptionRepo.update(existingBusinessCaseAssumption.id, newBusinessCaseAssumption);
          businessCaseAssumptionExists = true;
          break; 
        }
      }
      if (!businessCaseAssumptionExists) {
        await this.businessCaseAssumptionRepo.save(newBusinessCaseAssumption);
        await this.activityRepository.save({
          activity,
          user_id: userId,
          type: "business-case-assumptions",
        });
      }
    }
    return WriteResponse(200, createBusinessCaseAssumptionDto, 'Business Case Assumptions Created Successfully');
  } catch (error) {
    console.log(error);
    return WriteResponse(500, false, 'Something Went Wrong.');
  }
}
  async findAll() {
    try {
      const businessCaseAssumption = await this.businessCaseAssumptionRepo.find({
        where: { is_deleted: false },
        relations:['assumption','businessCaseDetail']
      });
      if (businessCaseAssumption.length > 0) {
        return WriteResponse(200, businessCaseAssumption, "Record Found Seccessfully.");
      }
      return WriteResponse(404, [], "Record Not Found");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async findOne(field: string = 'id', identifier: string) {
    var whereCondition = { is_deleted: false, [field]: identifier };
    const User = await this.businessCaseAssumptionRepo.findOne({ where: whereCondition,relations:['assumption','businessCaseDetail'] });
    if (!User) {
      return WriteResponse(404, false, 'User Not Found.');
    }
    return WriteResponse(200, User, 'User Found Successfully.');
  }


  async remove(id: string,req) {
    try {
      const userId = req.user.id;
      let activity = "Delete Business Case Assumption";
      const businessCaseAssumption = await this.businessCaseAssumptionRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!businessCaseAssumption) {
        return WriteResponse(404, [], "Record Not Found");
      }
      await this.businessCaseAssumptionRepo.update(id, { is_deleted: true });
      await this.activityRepository.save({ activity, user_id: userId, type: "business-case-assumptions" });
      return WriteResponse(200, true, "Record Deleted Successfully.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }
  async pagination(pagination: IPagination): Promise<any> {
    const { curPage, perPage, whereClause } = pagination;
    let lwhereClause = "f.is_deleted = false";
    const fieldsToSearch = [
      "default_value",
      "sensitive_analysis_minus",
      "sensitive_analysis_plus",
      "all",
    ];
    fieldsToSearch.forEach((field) => {
      const fieldValue = whereClause.find((p) => p.key === field)?.value;
      if (fieldValue) {
        lwhereClause += ` AND f.${field} LIKE '%${fieldValue}%'`;
      }
    });

    const component_type_id = pagination.whereClause.find(
      (p: any) => p.key === "component_type_id" && p.value,
    );

    if (component_type_id) {
      lwhereClause += ` and f.component_type_id =  '${component_type_id.value}'`;
    }
    const allValue = whereClause.find((p) => p.key === "all")?.value;
    if (allValue) {
      const conditions = fieldsToSearch
        .map((field) => `f.${field} LIKE '%${allValue}%'`)
        .join(" OR ");
      lwhereClause += ` AND (${conditions})`;
    }
    const skip = (curPage - 1) * perPage;
    const [list, count] = await this.businessCaseAssumptionRepo
      .createQueryBuilder("f")
      .leftJoinAndSelect('f.assumption', 'assumption')
      .leftJoinAndSelect('f.businessCaseDetail', 'businessCaseDetail')
      .where(lwhereClause)
      .skip(skip)
      .take(perPage)
      .orderBy("f.created_on", "DESC")
      .getManyAndCount();
    return paginateResponse(list, count);
  }

}
